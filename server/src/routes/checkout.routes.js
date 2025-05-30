import express from 'express';
import { confirmCheckout, createCheckoutSession, getCheckoutSession } from '../controllers/checkout.controller.js';

const router = express.Router();

router.get('/session/:id', getCheckoutSession);
router.post('/session', createCheckoutSession);
router.post('/confirm-session', confirmCheckout);

export default router;