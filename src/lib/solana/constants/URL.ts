import {Linking} from '../utils';

export const onConnectRedirectLink = Linking.createURL('onConnect');
export const onDisconnectRedirectLink = Linking.createURL('onDisconnect');
export const onSignAndSendTransactionRedirectLink = Linking.createURL('onSignAndSendTransaction');
export const onSignAllTransactionsRedirectLink = Linking.createURL('onSignAllTransactions');
export const onSignTransactionRedirectLink = Linking.createURL('onSignTransaction');
export const onSignMessageRedirectLink = Linking.createURL('onSignMessage');

export const onFetchBalanceRedirectLink = Linking.createURL('onFetchBalance');
