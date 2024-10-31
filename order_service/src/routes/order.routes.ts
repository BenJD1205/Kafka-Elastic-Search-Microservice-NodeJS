import express, { Request, Response, NextFunction } from 'express'
import { MessageBroker } from './../utils';
import { OrderEvent } from '../types';

const router = express.Router()

router.get("/orders", async (req: Request, res: Response, next: NextFunction) => {
    //order create logic

    //3rd step: publish the message
    await MessageBroker.publish({
        topic: 'OrderEvents',
        headers: { token: req.headers.authorization },
        event: OrderEvent.CREATE_ORDER,
        message: {
            orderId: 1,
            items: [
                {
                    productId: 1,
                    quantity: 1,
                },
                {
                    productId: 2,
                    quantity: 2,
                }
            ]
        }
    })

    return res.status(201).json({ message: 'Create cart' })
})

router.get("/orders/:id", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Create cart' })
})

router.post("/orders", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Create cart' })
})

router.patch("/orders", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Create cart' })
})

router.delete("/orders", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Create cart' })
})

export default router