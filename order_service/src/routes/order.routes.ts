import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get("/orders", (req: Request, res: Response, next: NextFunction) => {
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