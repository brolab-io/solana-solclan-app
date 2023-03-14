import {
  findClanAccount,
  findClanMemberAccount,
  findProposalAccount,
  findVaultAccount,
} from '@/configs/pdas';
import { solClanProgramId, solClanIDL } from '@/configs/programs';
import useConnection from '@/lib/solana/hooks/useConnection';
import useProgram from '@/lib/solana/hooks/useProgram';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import useSignAndSendTransaction from '@/lib/solana/hooks/useSignAndSendTransaction';
import { BN } from '@project-serum/anchor';
import { SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import {
  addPriorityFee,
  modifyComputeUnits,
  waitForTransactionSignatureConfirmation,
} from '@/lib/solana/utils';

type Payload = {
  proposalId: BN;
  clanId: BN;
  title: string;
  description: string;
  startAt: BN;
  endAt: BN;
  amount: BN;
};

const useCreateProposalMutation = () => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const connection = useConnection();
  const signAndSendTransaction = useSignAndSendTransaction();

  return useMutation(async (payload: Payload) => {
    if (!publicKey) {
      return Promise.reject('Please connect your wallet');
    }

    const clanAccount = findClanAccount(payload.clanId);
    const memberAccount = findClanMemberAccount(clanAccount, publicKey);
    const proposalAccount = findProposalAccount(payload.proposalId, clanAccount, publicKey);

    // const proposalAccountData = await program.account.proposal.fetch(proposalAccount);
    const vaultAccount = findVaultAccount(proposalAccount, publicKey);

    // console.log(`proposalAccountData: ${JSON.stringify(proposalAccountData)}`);

    const tx = await program.methods
      .createProposal(
        payload.proposalId,
        payload.title,
        payload.description,
        payload.startAt,
        payload.endAt,
        payload.amount,
      )
      .accounts({
        member: memberAccount,
        clan: clanAccount,
        vault: vaultAccount,
        proposal: proposalAccount,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
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

export default useCreateProposalMutation;
