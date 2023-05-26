import express from 'express';
import Transaction from '../models/Transaction.mjs';

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transaction = await Transaction.find().limit(50)
        .sort({ createdOn: -1 })
        res.status(200).json(transaction);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

export default router;