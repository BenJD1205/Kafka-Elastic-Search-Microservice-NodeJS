export enum CatalogEvent {
    CREATE_ORDER = 'create_order',
    CANCEL_ORDER = 'cancel_order',
}

export type TOPIC_TYPE = 'OrderEvents' | 'CatalogEvents';

export interface MessageType {
    headers?: Record<string, any>;
    event: CatalogEvent,
    data: Record<string, any>;
}