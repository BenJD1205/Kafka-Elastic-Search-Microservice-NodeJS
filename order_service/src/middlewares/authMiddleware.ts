import { Response, Request, NextFunction } from 'express';
import { ValidateUser } from 'src/utils';

export const RequestAuthorizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) return res.status(403).json({ error: 'Unauthorized due to authorization token missing' })
        const data = await ValidateUser(req.headers.authorization as string);
        req.user = data;
        next();
    } catch (err) {
        return res.status(403).json({ err })
    }
}