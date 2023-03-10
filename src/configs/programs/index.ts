import { IdlAccounts } from '@project-serum/anchor';
import { SolanaSolclan } from './solclan';
import { IDL as solClanIDL } from './solclan';

export type ClanData = IdlAccounts<SolanaSolclan>['clan'];

export { solClanIDL };
