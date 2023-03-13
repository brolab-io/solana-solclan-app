import { IdlAccounts } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { IDL as solClanIDL } from './solclan';
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';

export type ClanData = IdlAccounts<typeof solClanIDL>['clan'];
export const solClanProgramId = '3syBg6qTRQQ88DWEv3pe8E6ULRWRypp2d4v6Lpwn9ozr';
export const SOLCLAN_PROGRAM_ID = new PublicKey(solClanProgramId);
export const METADATA_PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
export { solClanIDL };
