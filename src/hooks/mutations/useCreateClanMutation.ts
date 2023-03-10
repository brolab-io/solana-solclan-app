import { findClanAccount, findClanCardAccount, findClanMemberAccount } from '@/configs/pdas';
import { solClanProgramId, solClanIDL } from '@/configs/programs';
import useConnection from '@/lib/solana/hooks/useConnection';
import useProgram from '@/lib/solana/hooks/useProgram';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import useSignAndSendTransaction from '@/lib/solana/hooks/useSignAndSendTransaction';
import { BN } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

type Payload = {
  id: BN;
  name: string;
  email: string;
  description: string;
};

const useCreateClanMutation = () => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const connection = useConnection();
  const signAndSendTransaction = useSignAndSendTransaction();

  return useMutation(async (payload: Payload) => {
    if (!publicKey) {
      return Promise.reject('Please connect your wallet');
    }
    const clanAccount = findClanAccount(payload.id);
    const memberAccount = findClanMemberAccount(payload.id, publicKey);
    const cardAccount = findClanCardAccount(payload.id);

    const tx = await program.methods
      .createClan(payload.id, payload.name, publicKey)
      .accounts({
        authority: publicKey,
        systemProgram: SystemProgram.programId,
        clan: clanAccount,
        member: memberAccount,
        card: cardAccount,
      })
      .transaction();

    tx.feePayer = publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    await signAndSendTransaction(tx);
    return await program.account.clan.fetch(clanAccount);
  });
};

export default useCreateClanMutation;
