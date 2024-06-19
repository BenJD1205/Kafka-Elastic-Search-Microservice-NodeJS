import express from 'express';
import cors from 'cors'
import routes from './routes'
import { httpLogger, HandleErrorWithLogger } from './utils';
const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(httpLogger)

//routes
app.use('/api/v1', routes);

app.use(HandleErrorWithLogger)

export default app;