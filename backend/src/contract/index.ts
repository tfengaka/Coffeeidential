import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import env from '~/config/env';
import contractABI from './contractCompiled';

export const web3 = new Web3(new Web3.providers.HttpProvider(env.BLOCKCHAIN_RPC));
if (env.PRIVATE_KEY) {
  web3.eth.accounts.wallet.add(env.PRIVATE_KEY);
  web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
}
export const contract: Contract = new web3.eth.Contract(contractABI.abi, env.CONTRACT_ADDRESS);
