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
import {
  addPriorityFee,
  modifyComputeUnits,
  waitForTransactionSignatureConfirmation,
} from '@/lib/solana/utils';
import { uploadImage, uploadMetadata } from '@/services/Web3Storage.service';
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata/dist/src/generated';
import { BN } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

type Payload = {
  id: BN;
  name: string;
  email: string;
  description: string;
  uri?: string;
  symbol: string;
  nftImage: any;
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

    const image_cid = await uploadImage(payload.nftImage);
    const metadata_cid = await uploadMetadata(image_cid, payload.name, '', payload.symbol);
    payload.uri = `https://w3s.link/ipfs/${metadata_cid}`;

    const clanAccount = findClanAccount(payload.id);
    const memberAccount = findClanMemberAccount(clanAccount, publicKey);
    const cardAccount = findClanCardAccount(clanAccount, publicKey);
    const associatedTokenAddress = await getAssociatedTokenAddress(cardAccount, publicKey);
    const metadataAccount = findMetadataAccount(cardAccount);
    const masterEditionAccount = findMasterEditionAccount(cardAccount);

    const tx = await program.methods
      .createClan(payload.id, payload.name, payload.symbol, payload.uri)
      .accounts({
        clan: clanAccount,
        member: memberAccount,
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

    const latestBlockHash = await connection.getLatestBlockhash();
    tx.recentBlockhash = latestBlockHash.blockhash;
    const txResult = await signAndSendTransaction(tx);
    await waitForTransactionSignatureConfirmation(connection, txResult);

    return await program.account.clan.fetch(clanAccount);
  });
};

export default useCreateClanMutation;
