import { SolanaSolclan } from '@/configs/programs/solclan';
import { Program, parseIdlErrors, Idl } from '@project-serum/anchor';
import { ComputeBudgetProgram, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import { decode, encode } from 'bs58';
import { Linking as RNLinking } from 'react-native';
import nacl from 'tweetnacl';
import { BN } from '@project-serum/anchor';
import moment from 'moment';

export const buildUrl = (path: string, params: URLSearchParams) => {
  return `https://phantom.app/ul/v1/${path}?${params.toString()}`;
};

export const decryptPayload = (data: string, nonce: string, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) {
    throw new Error('missing shared secret');
  }

  const decryptedData = nacl.box.open.after(decode(data), decode(nonce), sharedSecret);
  if (!decryptedData) {
    throw new Error('Unable to decrypt data');
  }
  return JSON.parse(Buffer.from(decryptedData).toString('utf8'));
};

export const encryptPayload = (payload: any, sharedSecret: Uint8Array) => {
  if (!sharedSecret) {
    throw new Error('missing shared secret');
  }

  const nonce = nacl.randomBytes(24);

  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret,
  );

  return [nonce, encryptedPayload];
};

export const formatPublicKey = (publicKey: string | PublicKey, padSize = 6) => {
  let _publicKey = typeof publicKey === 'string' ? publicKey : publicKey.toBase58();
  return `${_publicKey.slice(0, padSize)}...${_publicKey.slice(-padSize)}`;
};

export const formatSOL = (lamports: number) => {
  return (lamports / LAMPORTS_PER_SOL).toFixed(2);
};

export const formatTime = (unixTime: BN | Date) => {
  if ('getTime' in unixTime) {
    return moment(unixTime).format('HH:mm:ss A DD/MM/YYYY');
  }
  return moment(unixTime.toNumber() * 1000).format('HH:mm A DD/MM/YYYY');
};

export const getMutationMessage = (error: unknown, idl: Idl) => {
  if (error instanceof Error) {
    const message = error.message;
    // "failed to send transaction: Transaction simulation failed: Error processing Instruction 2: custom program error: 0x1780"
    const match = message.match(/custom program error: 0x([0-9a-f]+)/);
    if (match) {
      const code = parseInt(match[1], 16);
      const idlError = parseIdlErrors(idl);
      return idlError.get(code) || message;
    }
    return message;
  }
  return 'An error occurred';
};

export const checkIsMemberOfClan = async (
  program: Program<SolanaSolclan>,
  clanAccount: PublicKey,
  walletAccount: PublicKey,
) => {
  const [memberAccount] = await program.account.member.all([
    {
      memcmp: {
        offset: 8,
        bytes: encode(clanAccount.toBuffer()),
      },
    },
    {
      memcmp: {
        offset: 8 + 32,
        bytes: encode(walletAccount.toBuffer()),
      },
    },
  ]);

  return memberAccount || null;
};

export const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
  units: 1000000,
});

export const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: 1,
});

export const waitForTransactionSignatureConfirmation = async (
  connection: any,
  transaction: Transaction,
) => {
  const latestBlockHash = await connection.getLatestBlockhash();
  return connection.confirmTransaction(
    {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: transaction.signature!.toString(),
      // signature: tx.signatures[0],
    },
    'finalized',
  );
};

export const doNothing = () => {};

export const Linking = {
  openURL: RNLinking.openURL.bind(RNLinking),
  addEventListener: RNLinking.addEventListener.bind(RNLinking),
  getInitialURL: RNLinking.getInitialURL.bind(RNLinking),
  createURL: (path: string) => `solclan://solana/${path}`,
};
