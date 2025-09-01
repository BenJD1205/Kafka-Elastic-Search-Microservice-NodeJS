export interface InProcessOrder {
    id?: number;
    orderNumber: number;
    status: string;
    customerId: number;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
}