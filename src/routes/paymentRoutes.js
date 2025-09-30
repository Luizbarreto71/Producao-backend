import express from 'express';
import { createPayment, webhook } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', createPayment);
router.post('/webhook', webhook);

export default router;