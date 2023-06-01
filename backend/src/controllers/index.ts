import { Request, Response } from 'express';
import contract, { web3 } from '~/contract';
import { HTTP_STATUS } from '~/utils';

const getNodeStatus = async (req: Request, res: Response) => {
  try {
    const NetworkType = await web3.eth.net.getNetworkType();
    const nodeInfo = await web3.eth.getNodeInfo();
    const chainID = await web3.eth.getChainId();
    const PeerCount = await web3.eth.net.getPeerCount();
    const account = web3.eth.defaultAccount;
    res.json({
      chain_id: chainID,
      node_Info: nodeInfo,
      network_type: NetworkType,
      peer_count: PeerCount,
      default_account: account,
      contract: contract.options.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: err });
  }
};

const getNodeWallets = async (req: Request, res: Response) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const wallets = await Promise.all(
      accounts.map(async (account) => {
        const balance = await web3.eth.getBalance(account);
        return {
          address: account,
          balance,
        };
      })
    );
    res.status(HTTP_STATUS.OK).json(wallets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: err });
  }
};
export { getNodeWallets, getNodeStatus };

export { default as AuthController } from './auth.controller';
export { default as ProductController } from './products.controller';
export { default as UnitController } from './unit.controller';
export { default as UserController } from './users.controller';
export { default as DiaryController } from './diaries.controller';
