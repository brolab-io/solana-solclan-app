import { findBallotAccount, findClanMemberAccount } from '@/configs/pdas';
import { solClanProgramId, solClanIDL } from '@/configs/programs';
import useConnection from '@/lib/solana/hooks/useConnection';
import useProgram from '@/lib/solana/hooks/useProgram';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import useSignAndSendTransaction from '@/lib/solana/hooks/useSignAndSendTransaction';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import {
  addPriorityFee,
  modifyComputeUnits,
  waitForTransactionSignatureConfirmation,
} from '@/lib/solana/utils';

type Payload = {
  proposalPubkey: PublicKey;
  vote: boolean;
};

const useVoteProposalMutation = () => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const connection = useConnection();
  const signAndSendTransaction = useSignAndSendTransaction();

  return useMutation(async (payload: Payload) => {
    if (!publicKey) {
      return Promise.reject('Please connect your wallet');
    }
    const proposal = await program.account.proposal.fetch(payload.proposalPubkey);
    const clanAccount = proposal.clan;
    const memberAccount = findClanMemberAccount(clanAccount, publicKey);
    const ballotAccount = findBallotAccount(publicKey, memberAccount, payload.proposalPubkey);

    const tx = await program.methods
      .vote(payload.vote)
      .accounts({
        member: memberAccount,
        proposal: payload.proposalPubkey,
        ballot: ballotAccount,
        clan: clanAccount,
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

export default useVoteProposalMutation;
