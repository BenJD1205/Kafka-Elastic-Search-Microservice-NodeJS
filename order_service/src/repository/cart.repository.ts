import { CartRepositoryType } from "src/types/repository.type";
import { carts, CartLineItem, cartLineItems, Cart } from "../db/schema/cart";
import { DB } from "../db/db.connection";
import { NotFoundError } from "../utils";
import { eq } from "drizzle-orm";

const createCart = async (
    customerId: number,
    { itemName, price, productId, qty, variant }: CartLineItem
): Promise<number> => {
    const result = await DB.insert(carts)
        .values({
            customerId: customerId,
        })
        .returning()
        .onConflictDoUpdate({
            target: carts.customerId,
            set: { updatedAt: new Date() },
        });

    const [{ id }] = result;

    if (id > 0) {
        await DB.insert(cartLineItems).values({
            cartId: id,
            productId: productId,
            itemName: itemName,
            price: price,
            qty: qty,
            variant: variant,
        });
    }
    return id;
};

const findCart = async (id: number): Promise<Cart> => {
    const cart = await DB.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.customerId, id),
        with: {
            lineItems: true,
        },
    });

    if (!cart) {
        throw new NotFoundError("cart not found");
    }

    return cart;
};

const updateCart = async (id: number, qty: number): Promise<CartLineItem> => {
    const [cartLineItem] = await DB.update(cartLineItems)
        .set({
            qty: qty,
        })
        .where(eq(cartLineItems.id, id))
        .returning();
    return cartLineItem;
};

const deleteCart = async (id: number): Promise<boolean> => {
    await DB.delete(cartLineItems).where(eq(cartLineItems.id, id)).returning();
    return true;
};

const clearCartData = async (id: number): Promise<boolean> => {
    await DB.delete(carts).where(eq(carts.id, id)).returning();
    return true;
};

export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
};