import { findClanAccount, findClanMemberAccount, findTreasurerAccount } from '@/configs/pdas';
import { solClanProgramId, solClanIDL } from '@/configs/programs';
import useConnection from '@/lib/solana/hooks/useConnection';
import useProgram from '@/lib/solana/hooks/useProgram';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import useSignAndSendTransaction from '@/lib/solana/hooks/useSignAndSendTransaction';
import { BN } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import {
  addPriorityFee,
  modifyComputeUnits,
  waitForTransactionSignatureConfirmation,
} from '@/lib/solana/utils';

type Payload = {
  id: BN;
  amount: BN;
};

const useDepositMutation = () => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const connection = useConnection();
  const signAndSendTransaction = useSignAndSendTransaction();

  return useMutation(async (payload: Payload) => {
    if (!publicKey) {
      return Promise.reject('Please connect your wallet');
    }
    console.log('payload', payload);
    const clanAccount = findClanAccount(payload.id);
    const memberAccount = findClanMemberAccount(clanAccount, publicKey);
    const treasurerAccount = findTreasurerAccount(clanAccount);

    console.log(`Deposit ${payload.amount} to clan ${clanAccount.toBase58()}`);

    const tx = await program.methods
      .depositToClan(payload.amount)
      .accounts({
        member: memberAccount,
        clan: clanAccount,
        treasurer: treasurerAccount,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .preInstructions([modifyComputeUnits, addPriorityFee])
      .transaction();

    tx.feePayer = publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const txResult = await signAndSendTransaction(tx);
    await waitForTransactionSignatureConfirmation(connection, txResult);
    return await program.account.clan.fetch(clanAccount);
  });
};

export default useDepositMutation;
