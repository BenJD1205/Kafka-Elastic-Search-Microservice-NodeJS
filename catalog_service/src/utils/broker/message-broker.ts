import { Kafka, logLevel, Producer, Consumer, Partitioners } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";
import { BROKERS, CLIENT_ID, GROUP_ID } from "../../config";
import { MessageType, CatalogEvent, TOPIC_TYPE } from "../../types";

const kafka = new Kafka({
    clientId: CLIENT_ID || "",
    brokers: BROKERS,
    logLevel: logLevel.INFO
});

let producer: Producer;
let consumer: Consumer;

export const createTopic = async (topic: string[]) => {
    const topics = topic.map((t) => ({
        topic: t,
        numPartitions: 2,
        replicationFactor: 1,
    }))
    const admin = kafka.admin();
    await admin.connect();
    const topicExists = await admin.listTopics();
    for (const t of topics) {
        if (!topicExists.includes(t.topic)) {
            await admin.createTopics({
                topics: [t],
            })
        }
    }
    await admin.disconnect();
}

export const connectProducer = async <T>(): Promise<T> => {
    await createTopic(["OrderEvents"])
    if (!producer) {
        producer = kafka.producer();
    }

    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
    })

    await producer.connect();
    return producer as unknown as T;
}

export const disconnectProducer = async (): Promise<void> => {
    if (producer) {
        await producer.disconnect();
    }
}

export const publish = async (data: PublishType): Promise<boolean> => {
    const producer = await connectProducer<Producer>();
    const result = await producer.send({
        topic: data.topic,
        messages: [
            {
                headers: data.headers,
                key: data.event,
                value: JSON.stringify(data.message)
            }
        ]
    })
    return result.length > 0;
}

export const connectConsumer = async <T>(): Promise<T> => {
    await createTopic(["CatalogEvents"])

    if (consumer) {
        return consumer as unknown as T;
    }

    consumer = kafka.consumer({
        groupId: GROUP_ID,
    })
    await consumer.connect();
    return consumer as unknown as T;
}

const disconnectConsumer = async (): Promise<void> => {
    if (consumer) {
        await consumer.disconnect();
    }
}

export const subscribe = async (
    messageHandler: MessageHandler,
    topic: TOPIC_TYPE,
): Promise<void> => {
    const consumer = await connectConsumer<Consumer>();
    await consumer.subscribe({ topic: topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!["CatalogEvents"].includes(topic)) {
                return;
            }
            if (message.key && message.value) {
                const inputMessage: MessageType = {
                    headers: message.headers,
                    event: message.key.toString() as CatalogEvent,
                    data: message.value ? JSON.parse(message.value.toString()) : null,
                }
                await messageHandler(inputMessage);
                await consumer.commitOffsets([
                    { topic, partition, offset: (Number(message.offset) + 1).toString() }
                ])
            }
        }
    })
}

export const MessageBroker: MessageBrokerType = {
    connectProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe,
}