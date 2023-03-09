import {Transaction} from '@solana/web3.js';
import {encode} from 'bs58';
import {useCallback} from 'react';
import {onSignTransactionRedirectLink} from '../constants/URL';
import {useSolana} from '../providers/SolanaProvider';
import {encryptPayload, buildUrl} from '../utils';
import useDAppKeypair from './useDAppKeypair';
import usePublicKey from './usePublicKey';
import useSession from './useSession';
import useSharedSecret from './useSharedSecret';
import {Linking} from '../utils';

const useSignTransaction = () => {
  const publicKey = usePublicKey();
  const dappKeyPair = useDAppKeypair();
  const session = useSession();
  const sharedSecret = useSharedSecret();
  const {txPromise} = useSolana();

  const signTransaction = useCallback(
    async (transaction: Transaction) => {
      console.log('signTransaction xx');
      if (!sharedSecret || !publicKey || !session) {
        let missingFields = [];
        if (!sharedSecret) {
          missingFields.push('sharedSecret');
        }
        if (!publicKey) {
          missingFields.push('publicKey');
        }
        if (!session) {
          missingFields.push('session');
        }
        return Promise.reject(`Missing  ${missingFields.join(', ')} on useSignTransaction hook`);
      }

      console.log('signTransaction session', session);

      transaction.feePayer = publicKey;

      const serializedTransaction = encode(
        transaction.serialize({
          requireAllSignatures: false,
        }),
      );

      console.log('serializedTransaction', serializedTransaction);

      const payload = {
        session,
        transaction: serializedTransaction,
      };

      console.log('payload', payload);

      const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

      const params = new URLSearchParams({
        dapp_encryption_public_key: encode(dappKeyPair.publicKey),
        nonce: encode(nonce),
        redirect_link: onSignTransactionRedirectLink,
        payload: encode(encryptedPayload),
      });

      const url = buildUrl('signTransaction', params);
      Linking.openURL(url);

      const promise = new Promise<Transaction>((resolve, reject) => {
        txPromise.current = {resolve, reject};
      });

      return promise;
    },
    [sharedSecret, publicKey, session, dappKeyPair.publicKey, txPromise],
  );

  return signTransaction;
};

export default useSignTransaction;
