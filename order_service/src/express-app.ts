import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors'
import routes from './routes'
import { httpLogger, HandleErrorWithLogger, MessageBroker } from './utils';
import { Consumer, Producer } from 'kafkajs';

export const ExpressApp = async () => {
    const app = express();

    //middleware
    app.use(cors())
    app.use(compression());
    app.use(express.json());
    app.use(helmet());
    app.use(httpLogger)

    //kafka client
    //1st step: connect to producer and connect to consumer
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on('producer.connect', () => {
        console.log('producer connected');
    })

    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on('consumer.connect', () => {
        console.log('consumer connected');
    });

    //2nd step: subscribe to the topic or publish the message
    await MessageBroker.subscribe((message) => {
        console.log("Consumer received the message");
        console.log("Message received", message);
    }, 'OrderEvents');

    //routes
    app.use('/api/v1', routes);

    app.use(HandleErrorWithLogger);

    return app;
}