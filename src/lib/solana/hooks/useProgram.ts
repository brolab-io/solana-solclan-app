import { useCallback, useMemo } from 'react';
import useConnection from './useConnection';
import { Program, AnchorProvider, Idl } from '@project-serum/anchor';
import usePublicKey from './usePublicKey';
import { encode } from 'bs58';
import { onSignAllTransactionsRedirectLink } from '../constants/URL';
import { buildUrl, encryptPayload, Linking } from '../utils';
import { PublicKey, Transaction } from '@solana/web3.js';
import useDAppKeypair from './useDAppKeypair';
import useSession from './useSession';
import useSharedSecret from './useSharedSecret';
import useSignTransaction from './useSignTransaction';

const useProgram = <T extends Idl>(idl: T, programID: string) => {
  const connection = useConnection();
  const publicKey = usePublicKey();
  const dappKeyPair = useDAppKeypair();
  const session = useSession();
  const sharedSecret = useSharedSecret();
  const signTransaction = useSignTransaction();

  const signAllTransactions = useCallback(
    async (transactions: Transaction[]) => {
      console.log('signAllTransactions');
      if (!sharedSecret) {
        throw new Error('missing shared secret');
      }

      const serializedTransactions = transactions.map(t =>
        encode(
          t.serialize({
            requireAllSignatures: false,
          }),
        ),
      );

      const payload = {
        session,
        transactions: serializedTransactions,
      };

      const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

      const params = new URLSearchParams({
        dapp_encryption_public_key: encode(dappKeyPair.publicKey),
        nonce: encode(nonce),
        redirect_link: onSignAllTransactionsRedirectLink,
        payload: encode(encryptedPayload),
      });

      const url = buildUrl('signAllTransactions', params);
      await Linking.openURL(url);

      return transactions;
    },
    [sharedSecret, dappKeyPair.publicKey, session],
  );

  return useMemo(() => {
    const provider = new AnchorProvider(
      connection,
      {
        // @ts-ignore - publicKey is optional
        publicKey,
        signAllTransactions,
        signTransaction,
      },
      { commitment: 'processed' },
    );

    const program = new Program(idl, new PublicKey(programID), provider);

    return {
      program,
      provider,
    };
  }, [connection, idl, programID, publicKey, signAllTransactions, signTransaction]);
};

export default useProgram;
