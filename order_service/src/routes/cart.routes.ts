import express, { Request, Response, NextFunction } from 'express'
import * as services from '../services/cart.service'
import * as repository from '../repository/cart.repository'

const router = express.Router()
const repo = repository.CartRepository

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.GetCarts(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.CreateCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.EditCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await services.DeleteCart(req.body, repo)
    return res.status(201).json({ message: 'Create cart' })
})

export default router