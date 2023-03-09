import { useSolana } from "../providers/SolanaProvider";

const useConnection = () => {
  const { connection } = useSolana();
  return connection;
};

export default useConnection;
