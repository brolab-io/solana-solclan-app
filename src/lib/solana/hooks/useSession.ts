import { useSolana } from "../providers/SolanaProvider";

const useSession = () => {
  const { session } = useSolana();
  return session;
};

export default useSession;
