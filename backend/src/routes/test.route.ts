import { Router } from 'express';
import { web3, contract } from '~/contract';
import { User } from '~/models';
import { formatOrderNumber } from '~/utils';

const router = Router();

router.get('/get/net', async (req, res) => {
  try {
    const personal = web3.eth.personal;

    res.status(200).json({ personal });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
});
router.get('/get/wallets', async (req, res) => {
  try {
    const walletCount = web3.eth.accounts.wallet.length;
    const wallets = [];
    for (let i = 0; i < walletCount; i++) {
      wallets.push(web3.eth.accounts.wallet[i]);
    }
    res.status(200).json({ wallets });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
});

router.post('/create/wallet', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const account = await web3.eth.personal.newAccount(password);
    if (account) {
      const accountCount = await User.countDocuments();
      const user = await User.create({
        order_id: formatOrderNumber('MA', accountCount + 1),
        email,
        full_name: username,
        password,
        wallet: account,
      });
      return res.status(200).json({ user, wallets: web3.eth.accounts.wallet });
    }
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
});

export default router;
