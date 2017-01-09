import crypto from 'crypto';
import Web3 from 'web3';
import { string } from 'yargs';
import { encodeMessage } from '../util';
import BigNumber from 'bignumber.js';

export interface CoinbaseConfig {
  source: string
  endpoint: string
  api_key_id: string
  api_secret: string
  api_passphrase: string
}

export async function readCoinbasePayload(config: CoinbaseConfig, web3: Web3, senderKey: string, fetchFn) {
  let kind = "prices";
  let timestamp = (new Date().getTime() / 1000).toFixed(0);
  let prices = {
    "ETH": "498200000",
    // "BTC": "16411000000",
    // "DAI": "1000000",
    // "USDC": "1000000",
    // "USDT": "1000000",
  }
  // console.log(prices)
  // console.log("ETH:" + web3.utils.keccak256("ETH"));
  // console.log("BTC:" + web3.utils.keccak256("BTC"));
  // console.log("DAI:" + web3.utils.keccak256("DAI"));
  // console.log("USDC:" + web3.utils.keccak256("USDC"));
  // console.log("USDT:" + web3.utils.keccak256("USDT"));
  let messages: string[] = [];
  let signatures: string[] = [];

  for (let key in prices) {
    let message = encodeMessage(['string', 'uint64', 'string', 'uint64'], [kind, timestamp, key, prices[key]], web3);
    let hash = web3.utils.keccak256(message);
    let sig = web3.eth.accounts.sign(hash, senderKey);
    let signatory = web3.eth.accounts.recover(hash, sig.signature);
    let signature = encodeMessage(['bytes32', 'bytes32', 'uint8'], [sig.r, sig.s, sig.v], web3)
    messages.push(message);
    signatures.push(signature);
  }
  let result = {
    "timestamp": timestamp,
    "messages": messages,
    "signatures": signatures,
    "prices": prices
  };
  return {
    json: () => {
      return result
    }
  }
}
