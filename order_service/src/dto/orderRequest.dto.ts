export interface OrderLineItemType {
    id: number;
    productId: number;
    itemName: string;
    qty: number;
    price: number;
    orderId: number;

    createdAt: Date;
    updatedAt: Date;
}

export interface OrderWithLineItems {
    id?: number;
    customerId: number;
    orderId: number;
    txnId: string | null;
    amount: string;
    status: string;
    orderItems: any[];
    createdAt?: Date;
    updatedAt?: Date;
}