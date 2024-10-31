import { CartRequestInput } from "src/dto/cartRequest.dto"
import { CartRepositoryType } from "src/types/repository.type"
import { AuthorizeError, GetProductDetails, GetStockDetails, logger, NotFoundError } from "../utils"
import { CartLineItem } from "src/db/schema"

export const CreateCart = async (input: CartRequestInput & { customerId: number }, repo: CartRepositoryType) => {
    const product = await GetProductDetails(input.id)
    logger.info(product);
    if (product.stock < input.qty) {
        throw new NotFoundError("product is out of stock")
    }
    return await repo.createCart(input.customerId, {
        productId: product.id,
        price: product.price.toString(),
        qty: input.qty,
        itemName: product.name,
        variant: product.variant,
    } as CartLineItem);
}

export const GetCarts = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.findCart(input)
    return data
}

export const GetCart = async (id: number, repo: CartRepositoryType) => {
    //get customer cart data
    const cart = await repo.findCart(id);
    if (!cart) {
        throw new NotFoundError("cart not found");
    }

    //list out all line items in the cart
    const lineItems = cart.lineItems;
    if (!lineItems.length) {
        throw new NotFoundError("Cart items not found");
    }

    //verify with inventory service if the product is still available
    const stockDetails = await GetStockDetails(lineItems.map((item) => item.productId))
    if (Array.isArray(stockDetails)) {
        //update stock availability in cart line items
        lineItems.forEach((lineItem) => {
            const stockItem = stockDetails.find((stock) => stock.id === lineItem.productId);
            if (stockItem) {
                lineItem.availability = stockItem.stock;
            }
        })

        //update cart line items
        cart.lineItems = lineItems;
    }
    //return updated cart data with latest stock availability

    return cart;
}

export const EditCart = async (input: CartRequestInput & { customerId: number }, repo: CartRepositoryType) => {
    await AuthorizeCart(input.id, input.customerId, repo);
    const data = await repo.updateCart(input.id, input.qty)
    return data
}

export const DeleteCart = async (input: { id: number, customerId: number }, repo: CartRepositoryType) => {
    await AuthorizeCart(input.id, input.customerId, repo);
    const data = await repo.deleteCart(input.id)
    return data
}

export const AuthorizeCart = async (lineItemId: number, customerId: number, repo: CartRepositoryType) => {
    const cart = await repo.findCart(customerId);
    if (!cart) throw new NotFoundError("cart not found");

    const lineItem = cart.lineItems.find((item) => item.id === lineItemId);
    if (!lineItem) throw new AuthorizeError("You are not authorized to edit this cart!");
    return lineItem;
}