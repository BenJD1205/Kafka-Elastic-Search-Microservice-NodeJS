export enum PaymentEvent {
    CREATE_PAYMENT = 'create_payment',
    UPDATE_PAYMENT = 'update_payment',
}

export type TOPIC_TYPE = 'OrderEvents';

export interface MessageType {
    headers?: Record<string, any>;
    event: PaymentEvent,
    data: Record<string, any>;
}