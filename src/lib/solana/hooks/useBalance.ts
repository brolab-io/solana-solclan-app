import { PublicKey } from '@solana/web3.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useConnection from './useConnection';
import usePublicKey from './usePublicKey';

type State = {
  isFetching: boolean;
  error: unknown | null;
  balance: number | null;
};

type UseBalanceParams = {
  publicKey?: PublicKey | null;
};
const useBalance = (params: UseBalanceParams = {}) => {
  const connection = useConnection();
  const _publicKey = usePublicKey();
  const [state, setState] = useState<State>({
    isFetching: false,
    error: null,
    balance: null,
  });

  const fetchBalance = useCallback(
    (publicKey?: PublicKey | null) => {
      if (!publicKey) {
        return;
      }
      setState(prevState => ({ ...prevState, isFetching: true, error: null }));
      try {
        connection.getBalance(publicKey || _publicKey).then(balance => {
          setState(prevState => ({
            ...prevState,
            isFetching: false,
            error: null,
            balance,
          }));
        });
      } catch (error) {
        setState(prevState => ({ ...prevState, isFetching: false, error }));
      }
    },
    [_publicKey, connection],
  );

  useEffect(() => {
    if (params.publicKey || _publicKey) {
      fetchBalance(params.publicKey || _publicKey);
    }
  }, [_publicKey, fetchBalance, params.publicKey]);

  return useMemo(() => ({ ...state, fetchBalance }), [fetchBalance, state]);
};

export default useBalance;
