import { Cart, CartLineItem, carts } from "src/db/schema"

export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>;
    findCart: (id: number) => Promise<Cart>;
    updateCart: (id: number, qty: number) => Promise<CartLineItem>;
    deleteCart: (id: number) => Promise<Boolean>;
    clearCartData: (id: number) => Promise<Boolean>;
}