import { BN } from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { PublicKey } from '@solana/web3.js';
import { METADATA_PROGRAM_ID, SOLCLAN_PROGRAM_ID } from './programs';

export const findClanAccount = (clanId: BN) => {
  return findProgramAddressSync(
    [Buffer.from('clan'), clanId.toArrayLike(Buffer, 'le', 8)],
    SOLCLAN_PROGRAM_ID,
  )[0];
};

export const findClanMemberAccount = (clanAccount: PublicKey, publicKey: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('member'), clanAccount.toBuffer(), publicKey.toBuffer()],
    SOLCLAN_PROGRAM_ID,
  )[0];
};

export const findClanCardAccount = (clanAccount: PublicKey, publicKey: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('card'), clanAccount.toBuffer(), publicKey.toBuffer()],
    SOLCLAN_PROGRAM_ID,
  )[0];
};

export const findMetadataAccount = (mintAccount: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mintAccount.toBuffer()],
    METADATA_PROGRAM_ID,
  )[0];
};

export const findMasterEditionAccount = (mintAccount: PublicKey) => {
  return findProgramAddressSync(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mintAccount.toBuffer(),
      Buffer.from('edition'),
    ],
    METADATA_PROGRAM_ID,
  )[0];
};

export const findTreasurerAccount = (clanAccount: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('treasurer'), clanAccount.toBuffer()],
    SOLCLAN_PROGRAM_ID,
  )[0];
};

export const findProposalAccount = (
  proposalId: BN,
  clanAccount: PublicKey,
  walletAccount: PublicKey,
) => {
  return findProgramAddressSync(
    [
      Buffer.from('proposal'),
      proposalId.toArrayLike(Buffer, 'le', 8),
      clanAccount.toBuffer(),
      walletAccount.toBuffer(),
    ],
    SOLCLAN_PROGRAM_ID,
  )[0];
};

export const findVaultAccount = (proposalAccount: PublicKey, proposalAuthorAccount: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('vault'), proposalAccount.toBuffer(), proposalAuthorAccount.toBuffer()],
    SOLCLAN_PROGRAM_ID,
  )[0];
};
