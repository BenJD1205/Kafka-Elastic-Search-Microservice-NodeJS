import express, { Request, Response, NextFunction } from 'express'
import * as services from '../services/cart.service'
import * as repository from '../repository/cart.repository'
import { ValidateRequest } from '../utils/validator'
import { CartRequestInput, CartRequestSchema } from '../dto/cartRequest.dto'
import { RequestAuthorizer } from '../middlewares';

const router = express.Router()
const repo = repository.CartRepository

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const data = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Get carts successfully', data })
})

router.get("/", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) return next(new Error("User not found"))
        const data = await services.GetCart(user.id, repo);
        return res.status(200).json({
            message: 'Get cart successfully',
            data,
        });
    } catch (err) {
        next(err);
    }

})

router.post("/", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) return next(new Error("User not found"))

        const error = ValidateRequest<CartRequestInput>(
            req.body,
            CartRequestSchema
        );

        if (error) {
            return res.status(404).json({ error });
        }

        const input: CartRequestInput = req.body;

        const data = await services.CreateCart(
            { ...input, customerId: user.id },
            repo
        );
        return res.status(200).json({
            message: 'Create cart successfully',
            data
        });
    } catch (err) {
        return res.status(500).json({ err })
    }
})

router.patch("/:lineItemId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) return next(new Error("User not found"))

        const { lineItemId } = req.params;
        const data = await services.EditCart(
            {
                id: +lineItemId,
                qty: req.body.qty,
                customerId: user.id,
            },
            repo
        );
        return res.status(200).json({
            message: 'Updated cart successfully',
            data,
        });
    }
    catch (err) {
        next(err);
    }

})

router.delete("/:lineItemId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) return next(new Error("User not found"))
        const { lineItemId } = req.params;
        const data = await services.DeleteCart({
            id: +lineItemId,
            customerId: user.id,
        }, repo);
        return res.status(200).json({
            message: 'Delete cart successfully',
            data
        });
    } catch (err) {
        next(err);
    }
})

export default router