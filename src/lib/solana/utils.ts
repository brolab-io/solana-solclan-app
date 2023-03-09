import {decode} from 'bs58';
import {Linking as RNLinking} from 'react-native';
import nacl from 'tweetnacl';

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

export const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
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

export const Linking = {
  openURL: RNLinking.openURL,
  addEventListener: RNLinking.addEventListener,
  getInitialURL: RNLinking.getInitialURL,
  createURL: (path: string) => `solclan://solana/${path}`,
};
