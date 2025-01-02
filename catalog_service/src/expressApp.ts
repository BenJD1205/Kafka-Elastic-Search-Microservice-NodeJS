import { InitializeBroker } from './../../order_service/src/services/broker.service';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import catalogRoute from './api/catalog.routes';
import { HandleErrorWithLogger } from './utils/error';
import { httpLogger } from './utils/logger';
export const ExpressApp = async () => {
    const app = express();

    //middleware
    app.use(express.json());
    app.use(helmet())
    app.use(compression());
    app.use(httpLogger)

    await InitializeBroker();

    //routes
    app.use("/", catalogRoute);

    //health
    app.use("/", (req: Request, res: Response, _: NextFunction) => {
        return res.status(200).json({ message: "I am healty" })
    })

    app.use(HandleErrorWithLogger)
    return app;
}