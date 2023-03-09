import { useSolana } from "../providers/SolanaProvider";

const usePublicKey = () => {
  const { phantomWalletPublicKey: connectedAccount } = useSolana();
  return connectedAccount;
};

export default usePublicKey;
