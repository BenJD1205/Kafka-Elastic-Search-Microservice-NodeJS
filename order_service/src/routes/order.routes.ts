import express, { Request, Response, NextFunction } from 'express'
import * as services from '../services/order.service'
import { MessageBroker } from './../utils';
import { OrderEvent } from '../types';
import { OrderRepository } from 'src/repository/order.repository';
import { CartRepository } from 'src/repository';

const router = express.Router()
const repo = OrderRepository;
const cartRepo = CartRepository;

router.get("/orders", async (req: Request, res: Response, next: NextFunction) => {
    //order create logic
    const user = req.user;
    if (!user) return next(new Error("User not found"));
    const response = await services.GetOrders(user.id, repo);

    //3rd step: publish the message
    // await MessageBroker.publish({
    //     topic: 'OrderEvents',
    //     headers: { token: req.headers.authorization },
    //     event: OrderEvent.CREATE_ORDER,
    //     message: {
    //         orderId: 1,
    //         items: [
    //             {
    //                 productId: 1,
    //                 quantity: 1,
    //             },
    //             {
    //                 productId: 2,
    //                 quantity: 2,
    //             }
    //         ]
    //     }
    // })

    return res.status(201).json(response);
})

router.get("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new Error("User not found"));
    const response = await services.GetOrder(user.id, repo);
    return res.status(201).json({ message: 'Create cart' })
})

router.post("/orders", async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new Error("User not found"));
    const response = await services.CreateOrder(user.id, repo, cartRepo)
    return res.status(201).json({ message: 'Create cart' })
})

router.patch("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new Error("User not found"));
    const orderId = parseInt(req.params.id);
    const status = req.body.status;
    const response = await services.UpdateOrder(orderId, status, repo);
    return res.status(201).json(response);
})

router.delete("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new Error("User not found"));
    const orderId = parseInt(req.params.id);
    const response = await services.DeleteOrder(orderId, repo);
    return res.status(201).json({ message: 'Create cart' })
})

export default router