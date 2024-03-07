import express from 'express';
import cartRoutes from './cart.routes'
import orderRoutes from './order.routes'
const router = express.Router()

router.use('/carts', cartRoutes)
router.use('/orders', orderRoutes)

export default router