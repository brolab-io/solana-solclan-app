import {
  findClanAccount,
  findClanCardAccount,
  findClanMemberAccount,
  findMasterEditionAccount,
  findMetadataAccount,
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
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';
import {
  addPriorityFee,
  modifyComputeUnits,
  waitForTransactionSignatureConfirmation,
} from '@/lib/solana/utils';

type Payload = {
  id: BN;
};

const useJoinClanMutation = () => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const connection = useConnection();
  const signAndSendTransaction = useSignAndSendTransaction();

  return useMutation(async (payload: Payload) => {
    if (!publicKey) {
      return Promise.reject('Please connect your wallet');
    }
    const clanAccount = findClanAccount(payload.id);
    const memberAccount = findClanMemberAccount(clanAccount, publicKey);
    const cardAccount = findClanCardAccount(clanAccount, publicKey);
    const metadataAccount = findMetadataAccount(cardAccount);
    const masterEditionAccount = findMasterEditionAccount(cardAccount);

    const associatedTokenAddress = await getAssociatedTokenAddress(cardAccount, publicKey);

    const tx = await program.methods
      .joinClan(clanAccount)
      .accounts({
        member: memberAccount,
        clan: clanAccount,
        card: cardAccount,
        tokenAccount: associatedTokenAddress,
        metadata: metadataAccount,
        masterEdition: masterEditionAccount,
        authority: publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenMetadataProgram: PROGRAM_ADDRESS,
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

export default useJoinClanMutation;
