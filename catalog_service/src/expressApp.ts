import express from 'express';
import catalogRoute from './api/catalog.routes';
import { HandleErrorWithLogger } from './utils/error';
import { httpLogger } from './utils/logger';
const app = express();

//middleware
app.use(express.json());
app.use(httpLogger)

//routes
app.use("/", catalogRoute);

app.use(HandleErrorWithLogger)

export default app;