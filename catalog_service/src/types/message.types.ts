export type OrderLineItemType = {
    id: number;
    productId: number;
    qty: number;
}

export interface OrderWithLineItems {
    id?: number;
    orderNumber: number;
    orderItems: OrderLineItemType[];
}