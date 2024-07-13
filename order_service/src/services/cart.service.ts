import { CartRequestInput } from "src/dto/cartRequest.dto"
import { CartRepositoryType } from "src/types/repository.type"
import { GetProductDetails, logger, NotFoundError } from "../utils"
import { CartLineItem } from "src/db/schema"

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
    const product = await GetProductDetails(input.productId)
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
    const data = await repo.findCart(id);
    if (!data) {
        throw new NotFoundError("cart not found");
    }
    return data;
}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.updateCart(input.id, input.qty)
    return data
}

export const DeleteCart = async (id: number, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(id)
    return data
}