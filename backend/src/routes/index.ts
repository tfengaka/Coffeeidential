import { Router } from 'express';
import contract, { web3 } from '~/contract';
import { HTTP_STATUS } from '~/utils';
import AuthRouter from './auth.route';
import ProductRouter from './product.route';
import UnitRouter from './unit.route';

const router = Router();

router.get('/status', async (req, res) => {
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
      contract_address: contract?.options.address,
      default_account: account,
      API_Server: 'Ready!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: err });
  }
});

router.get('/wallets', async (req, res) => {
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
});

router.use('/', AuthRouter);
router.use('/units', UnitRouter);
router.use('/product', ProductRouter);

export default router;
