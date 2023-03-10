import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Cluster, clusterApiUrl, Connection, PublicKey, Transaction } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { decode } from 'bs58';
import { decryptPayload, Linking } from '../utils';

type ContextValue = {
  cluster: Cluster;
  connection: Connection;
  session: string | null;
  dappKeyPair: nacl.BoxKeyPair;
  phantomWalletPublicKey: PublicKey | null;
  sharedSecret: Uint8Array | null;
  txPromise: React.MutableRefObject<{
    resolve: (value: Transaction) => void;
    reject: (e: Error) => void;
  }>;
};

const SolanaContext = createContext<ContextValue>({} as ContextValue);

type Props = {
  cluster?: Cluster;
};

export const useSolana = () => {
  return useContext(SolanaContext);
};

export const SolanaProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  cluster = 'devnet',
}) => {
  const connection = useMemo(() => new Connection(clusterApiUrl(cluster)), [cluster]);
  const [session, setSession] = useState<string | null>(null);
  const [sharedSecret, setSharedSecret] = useState<Uint8Array | null>(null);
  const dappKeyPair = useMemo(() => nacl.box.keyPair(), []);
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<PublicKey | null>(null);
  const txPromise = useRef<ContextValue['txPromise']['current']>({
    resolve: () => {},
    reject: () => {},
  });

  const [_, setLogs] = useState<string[]>([]);
  const addLog = useCallback((log: string) => setLogs(logs => [...logs, '> ' + log]), []);

  const handleDeepLink: Parameters<typeof Linking.addEventListener>[1] = useCallback(
    ({ url: deepLink }) => {
      const url = new URL(deepLink);
      const params = url.searchParams;

      if (params.get('errorCode')) {
        addLog(JSON.stringify(Object.fromEntries([...params]), null, 2));
        console.log(
          'handleDeepLink error',
          params.get('errorCode'),
          JSON.stringify(Object.fromEntries([...params]), null, 2),
        );
        const error: any = Object.fromEntries([...params]);
        txPromise.current.reject(new Error(error.errorMessage));
        return;
      }

      console.log('handleDeepLink url', url);

      if (/onConnect/.test(url.pathname)) {
        const sharedSecretDapp = nacl.box.before(
          decode(params.get('phantom_encryption_public_key')!),
          dappKeyPair.secretKey,
        );

        const connectData = decryptPayload(
          params.get('data')!,
          params.get('nonce')!,
          sharedSecretDapp,
        );

        setSharedSecret(sharedSecretDapp);
        setSession(connectData.session);
        setPhantomWalletPublicKey(new PublicKey(connectData.public_key));

        addLog(JSON.stringify(connectData, null, 2));
      } else if (/onDisconnect/.test(url.pathname)) {
        addLog('Disconnected!');
        setPhantomWalletPublicKey(null);
      } else if (/onSignAndSendTransaction/.test(url.pathname)) {
        const signAndSendTransactionData = decryptPayload(
          params.get('data')!,
          params.get('nonce')!,
          sharedSecret!,
        );
        txPromise.current.resolve(signAndSendTransactionData);
        addLog(JSON.stringify(signAndSendTransactionData, null, 2));
      }
      // else if (/onSignAllTransactions/.test(url.pathname)) {
      //   const signAllTransactionsData = decryptPayload(
      //     params.get("data")!,
      //     params.get("nonce")!,
      //     sharedSecret
      //   );

      //   const decodedTransactions = signAllTransactionsData.transactions.map((t: string) =>
      //     Transaction.from(bs58.decode(t))
      //   );

      //   addLog(JSON.stringify(decodedTransactions, null, 2));
      // }
      else if (/onSignTransaction/.test(url.pathname)) {
        const signTransactionData = decryptPayload(
          params.get('data')!,
          params.get('nonce')!,
          sharedSecret!,
        );

        const decodedTransaction = Transaction.from(decode(signTransactionData.transaction));
        // const decodedTransaction = VersionedTransaction.deserialize(
        //   signTransactionData.transaction
        // );

        // console.log("decodedTransaction", decodedTransaction);

        txPromise.current.resolve(decodedTransaction);
        addLog(JSON.stringify(decodedTransaction, null, 2));
      }
      //  else if (/onSignMessage/.test(url.pathname)) {
      //   const signMessageData = decryptPayload(
      //     params.get("data")!,
      //     params.get("nonce")!,
      //     sharedSecret
      //   );

      //   addLog(JSON.stringify(signMessageData, null, 2));
      // }
    },
    [addLog, dappKeyPair.secretKey, sharedSecret],
  );

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('initialUrl', initialUrl);
    })();
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, [handleDeepLink]);

  const contextValue = useMemo(
    () => ({
      cluster,
      connection,
      dappKeyPair,
      phantomWalletPublicKey,
      session,
      sharedSecret,
      txPromise,
    }),
    [cluster, dappKeyPair, phantomWalletPublicKey, connection, session, sharedSecret],
  );

  return <SolanaContext.Provider value={contextValue}>{children}</SolanaContext.Provider>;
};
