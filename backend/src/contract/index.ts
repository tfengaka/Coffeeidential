import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import env from '~/config/env';
import contractABI from './contract.json';

export const web3 = new Web3(new Web3.providers.HttpProvider(env.BLOCKCHAIN_RPC));
if (env.PRIVATE_KEY) {
  web3.eth.accounts.wallet.add(env.PRIVATE_KEY);
}
if (env.DEFAULT_ADDRESS) {
  web3.eth.defaultAccount = env.DEFAULT_ADDRESS;
}

function initContract() {
  if (env.CONTRACT_ADDRESS) {
    const contract: Contract = new web3.eth.Contract(contractABI.abi as AbiItem[], env.CONTRACT_ADDRESS);
    return contract;
  }
  const contract: Contract = new web3.eth.Contract(contractABI.abi as AbiItem[]);
  contract
    .deploy({
      data: contractABI.bytecode,
    })
    .send(
      {
        from: env.DEFAULT_ADDRESS || '',
      },
      (err, transactionHash) => {
        if (err) {
          console.error(err);
        }
        console.log('transactionHash', transactionHash);
      }
    )
    .on('error', function (error) {
      console.error(error);
    })
    .on('receipt', function (receipt) {
      console.info('Deploy Receipt:', receipt); // contains the new contract address
    })
    .then((newContractInstance) => {
      console.log('Contract Address:', newContractInstance.options.address);
      return newContractInstance;
    });
}

export default initContract();
