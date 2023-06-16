import { Router } from 'express';
import contract, { web3 } from '~/contract';

const router = Router();

router.get('/create/product', async (req, res) => {
  try {
    const tx = await contract.methods.createNewProduct('Cà phê Arabica Lâm đồng', 'Catimor').send({
      from: web3.eth.defaultAccount,
      gas: 2000000,
    });
    res.status(200).json({ tx });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
