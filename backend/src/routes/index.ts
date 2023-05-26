import { Router } from 'express';
import { web3 } from '~/models';
import { verifyToken } from '~/middleware';
import { HTTP_STATUS } from '~/utils';
import AuthRouter from './auth.route';
import UnitRouter from './unit.route';

const router = Router();

router.get('/status', async (req, res) => {
  try {
    const nodeInfo = await web3.eth.getNodeInfo();
    res.json({
      server: 'Hello World!',
      nodeInfo,
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

// Auth Routing
router.use('/', AuthRouter);
router.use('/units', verifyToken, UnitRouter);

export default router;
