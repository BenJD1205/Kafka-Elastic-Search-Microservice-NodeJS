import { Cart, CartLineItem, carts } from "src/db/schema"
import { CartWithLineItems } from "src/dto/cartRequest.dto";
import { OrderWithLineItems } from "src/dto/orderRequest.dto";

export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>;
    findCart: (id: number) => Promise<CartWithLineItems>;
    updateCart: (id: number, qty: number) => Promise<CartLineItem>;
    deleteCart: (id: number) => Promise<Boolean>;
    clearCartData: (id: number) => Promise<Boolean>;
    findCartByProductId: (customerId: number, productId: number) => Promise<CartLineItem>;
}

export type OrderRepositoryType = {
    createOrder: (lineItem: OrderWithLineItems) => Promise<number>;
    findOrder: (id: number) => Promise<OrderWithLineItems | null>;
    updateOrder: (id: number, status: string) => Promise<OrderWithLineItems>;
    deleteOrder: (id: number) => Promise<boolean>;
    findOrdersByCustomerId: (customerId: number) => Promise<OrderWithLineItems[]>;
}