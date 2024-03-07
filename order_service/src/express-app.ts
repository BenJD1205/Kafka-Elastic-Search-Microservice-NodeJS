import express from 'express';
import cors from 'cors'
import routes from './routes'
const app = express();

//middleware
app.use(cors())
app.use(express.json());

//routes
app.use('/api/v1', routes);

export default app;