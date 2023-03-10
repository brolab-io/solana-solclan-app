import { IdlAccounts } from '@project-serum/anchor';
import { IDL as solClanIDL } from './solclan';

export type ClanData = IdlAccounts<typeof solClanIDL>['clan'];
export const solClanProgramId = '7SuqbkN8yMTXqQPdoUQ1DksQqGE6QKoeaC2j6N7cNmAF';

export { solClanIDL };
