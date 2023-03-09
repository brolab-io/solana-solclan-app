import { useSolana } from "../providers/SolanaProvider";

const useDAppKeypair = () => {
  const { dappKeyPair } = useSolana();
  return dappKeyPair;
};

export default useDAppKeypair;
