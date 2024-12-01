import { CartRepositoryType } from "src/types/repository.type";
import { carts, CartLineItem, cartLineItems, Cart } from "../db/schema/cart";
import { DB } from "../db/db.connection";
import { NotFoundError } from "../utils";
import { eq } from "drizzle-orm";
import { CartWithLineItems } from "src/dto/cartRequest.dto";

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

const findCart = async (id: number): Promise<CartWithLineItems> => {
    const cart = await DB.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.customerId, id),
        with: {
            lineItems: true,
        },
    });

    if (!cart) {
        throw new NotFoundError("cart not found");
    }

    return cart as unknown as CartWithLineItems;
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

const findCartByProductId = async (customerId: number, productId: number): Promise<CartLineItem> => {
    const cart = await DB.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.customerId, customerId),
        with: {
            lineItems: true,
        }
    })
    const lineItem = cart?.lineItems.find((item) => item.productId === productId);
    return lineItem as CartLineItem;
}

export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
    findCartByProductId,
};