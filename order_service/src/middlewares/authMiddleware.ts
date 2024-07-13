import { Response, Request, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: jwt handle 
    const isValid = true;
    if (!isValid) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }
}