import express, { Request, Response, NextFunction } from 'express'
import * as services from '../services/cart.service'
import * as repository from '../repository/cart.repository'
import { ValidateRequest } from '../utils/validator'
import { CartRequestInput, CartRequestSchema } from '../dto/cartRequest.dto'
import { authMiddleware } from '../middlewares';

const router = express.Router()
const repo = repository.CartRepository

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCart(req.body.customerId, repo);
    return res.status(200).json(response);
})

router.post("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = ValidateRequest<CartRequestInput>(
            req.body,
            CartRequestSchema
        );

        if (error) {
            return res.status(404).json({ error });
        }

        const response = await services.CreateCart(
            req.body as CartRequestInput,
            repo
        );
        return res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({ err })
    }
})

router.patch("/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    const { lineItemId } = req.params;
    const response = await services.EditCart(
        {
            id: +lineItemId,
            qty: req.body.qty,
        },
        repo
    );
    return res.status(200).json(response);
})

router.delete("/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    const { lineItemId } = req.params;
    const response = await services.DeleteCart(+lineItemId, repo);
    return res.status(200).json(response);
})

export default router