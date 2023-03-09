import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";

type UsePDAParams = {
  seeds: string[];
  programId: PublicKey;
};

const usePDA = ({ seeds, programId }: UsePDAParams) => {
  const pda = useMemo(() => {
    console.log("usePDA seeds", seeds, "programId", programId);
    const _seeds = seeds.map((seed) => Buffer.from(seed));
    return PublicKey.findProgramAddressSync(_seeds, programId)[0];
  }, [seeds, programId]);
  return pda;
};

export default usePDA;
