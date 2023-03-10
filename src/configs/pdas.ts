import { BN } from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { PublicKey, SystemProgram } from '@solana/web3.js';

export const findClanAccount = (clanId: BN) => {
  return findProgramAddressSync(
    [Buffer.from('clan'), clanId.toArrayLike(Buffer, 'le', 8)],
    SystemProgram.programId,
  )[0];
};

export const findClanMemberAccount = (clanAccount: PublicKey, publicKey: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('member'), clanAccount.toBuffer(), publicKey.toBuffer()],
    SystemProgram.programId,
  )[0];
};

export const findClanCardAccount = (clanAccount: PublicKey) => {
  return findProgramAddressSync(
    [Buffer.from('card'), clanAccount.toBuffer()],
    SystemProgram.programId,
  )[0];
};
