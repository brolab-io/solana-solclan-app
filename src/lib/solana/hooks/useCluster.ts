import { useSolana } from "../providers/SolanaProvider";

const useCluster = () => {
  const { cluster } = useSolana();
  return cluster;
};

export default useCluster;
