import { IdlAccounts } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { IDL as solClanIDL } from './solclan';
import { PROGRAM_ADDRESS } from '@metaplex-foundation/mpl-token-metadata';

export type ClanData = IdlAccounts<typeof solClanIDL>['clan'];
export type ProposalData = IdlAccounts<typeof solClanIDL>['proposal'];
export const solClanProgramId = '2iHBmcNR29ub8sQ4BSk7yZSBg29Paj7NRG9cDVL9sUa6';
export const SOLCLAN_PROGRAM_ID = new PublicKey(solClanProgramId);
export const METADATA_PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
export { solClanIDL };
