import { Transaction } from "@solana/web3.js";
import { encode } from "bs58";
import { openURL } from "expo-linking";
import { useCallback, useRef } from "react";
import {
  onSignAndSendTransactionRedirectLink,
  onSignTransactionRedirectLink,
} from "../constants/URL";
import { useSolana } from "../providers/SolanaProvider";
import { encryptPayload, buildUrl } from "../utils";
import useDAppKeypair from "./useDAppKeypair";
import usePublicKey from "./usePublicKey";
import useSession from "./useSession";
import useSharedSecret from "./useSharedSecret";

const useSignAndSendTransaction = () => {
  const publicKey = usePublicKey();
  const dappKeyPair = useDAppKeypair();
  const session = useSession();
  const sharedSecret = useSharedSecret();
  const { txPromise } = useSolana();

  const signAndSendTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!sharedSecret || !publicKey || !session) {
        let missingFields = [];
        if (!sharedSecret) missingFields.push("sharedSecret");
        if (!publicKey) missingFields.push("publicKey");
        if (!session) missingFields.push("session");
        return Promise.reject(
          `Missing ${missingFields.join(", ")} on useSignAndSendTransaction hook`
        );
      }

      const serializedTransaction = encode(
        transaction.serialize({
          requireAllSignatures: false,
        })
      );

      const payload = {
        session,
        transaction: serializedTransaction,
      };

      console.log("payload", payload);

      const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

      const params = new URLSearchParams({
        dapp_encryption_public_key: encode(dappKeyPair.publicKey),
        nonce: encode(nonce),
        redirect_link: onSignAndSendTransactionRedirectLink,
        payload: encode(encryptedPayload),
      });

      const url = buildUrl("signAndSendTransaction", params);

      const promise = new Promise<Transaction>((resolve, reject) => {
        txPromise.current = { resolve, reject };
      });

      await openURL(url);

      return promise;
    },
    [sharedSecret, dappKeyPair.publicKey, session, publicKey]
  );

  return signAndSendTransaction;
};

export default useSignAndSendTransaction;
