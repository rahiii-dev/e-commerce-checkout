import express from 'express';
import { getOrderDetails } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/:id', getOrderDetails);

export default router;