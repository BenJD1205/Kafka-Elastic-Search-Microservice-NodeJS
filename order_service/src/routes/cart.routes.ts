import express, { Request, Response, NextFunction } from 'express'
import * as services from '../services/cart.service'
import * as repository from '../repository/cart.repository'

const router = express.Router()
const repo = repository.CartRepository

router.get("/carts", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.get("/carts/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.post("/carts", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.CreateCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.patch("/carts", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.EditCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.delete("/carts", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.DeleteCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

export default router