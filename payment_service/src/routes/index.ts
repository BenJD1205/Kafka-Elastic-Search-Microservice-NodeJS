import express from 'express';
const router = express.Router()
import paymentRoutes from './payment.routes'

router.use('/payments', paymentRoutes)

export default router