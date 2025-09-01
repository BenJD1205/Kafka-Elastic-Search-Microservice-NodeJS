import { Producer, Consumer } from "kafkajs";
import { MessageBroker } from "../utils";
import { HandleSubscription } from "./payment.service";
import { PaymentEvent } from "../types";
//initialized the broker
export const InitializeBroker = async () => {
    const producer = await MessageBroker.connectConsumer<Producer>();
    producer.on("producer.connect", async () => {
        console.log("Order Service Producer connected successfully");
    })

    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", async () => {
        console.log("Order Service Consumer connected successfully");
    })

    //keep listening to consumers events
    //perform the action based on the event
    await MessageBroker.subscribe(HandleSubscription, "OrderEvents");
}

//publish dedicated events based on usecases
export const SendPaymentUpdateMessage = async (data: unknown) => {
    await MessageBroker.publish({
        event: PaymentEvent.UPDATE_PAYMENT,
        topic: "OrderEvents",
        headers: {},
        message: {
            data
        },
    })
}