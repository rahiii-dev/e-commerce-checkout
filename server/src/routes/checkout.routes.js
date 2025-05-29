import express from 'express';
import { createCheckoutSession, getCheckoutSession } from '../controllers/checkout.controller.js';

const router = express.Router();

router.get('/session/:id', getCheckoutSession);
router.post('/session', createCheckoutSession);

export default router;