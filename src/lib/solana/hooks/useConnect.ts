import { encode } from "bs58";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildUrl } from "../utils";
import tweetnacl from "tweetnacl";
import { openURL } from "expo-linking";

import { onConnectRedirectLink } from "../constants/URL";
import useCluster from "./useCluster";
import useDAppKeypair from "./useDAppKeypair";
import usePublicKey from "./usePublicKey";
import { PublicKey } from "@solana/web3.js";

const app_url = "https://phantom.app";

type State = {
  isConnecting: boolean;
  isConnected: boolean;
  error: unknown | null;
  publicKey: PublicKey | null;
};

const useConnect = () => {
  const cluster = useCluster();
  const { publicKey } = useDAppKeypair();
  const connectedPublicKey = usePublicKey();
  const [state, setState] = useState<State>({
    isConnecting: false,
    isConnected: !!connectedPublicKey,
    error: null,
    publicKey: connectedPublicKey,
  });
  const connect = useCallback(async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: encode(publicKey),
      cluster,
      app_url,
      redirect_link: onConnectRedirectLink,
    });
    const url = buildUrl("connect", params);
    setState((prevState) => ({
      ...prevState,
      isConnecting: true,
      isConnected: false,
      error: null,
    }));
    try {
      await openURL(url);
      setState((prevState) => ({
        ...prevState,
        isConnecting: false,
        isConnected: true,
        error: null,
      }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, isConnecting: false, isConnected: false, error }));
    }
  }, []);

  useEffect(() => {
    if (connectedPublicKey) {
      setState((prevState) => ({
        ...prevState,
        isConnecting: false,
        isConnected: true,
        error: null,
        publicKey: connectedPublicKey,
      }));
    }
  }, [connectedPublicKey]);

  return useMemo(() => ({ ...state, connect }), [state, connect]);
};
export default useConnect;
