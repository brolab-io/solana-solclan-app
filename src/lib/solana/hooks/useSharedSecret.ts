import { useSolana } from "../providers/SolanaProvider";

const useSharedSecret = () => {
  const { sharedSecret } = useSolana();
  return sharedSecret;
};

export default useSharedSecret;
