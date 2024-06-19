import { CartRequestInput } from "src/dto/cartRequest.dto"
import { CartRepositoryType } from "src/types/repository.type"
import { GetProductDetails, NotFoundError } from "../utils"

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
    const product = await GetProductDetails(input.productId)
    if (product.stock < input.qty) {
        throw new NotFoundError("product is out of stock")
    }
    const data = await repo.create(input)
    return data
}

export const GetCarts = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.find(input)
    return data
}

export const GetCart = async (input: any) => {
    return { message: 'created cart from service' }
}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.update(input)
    return data
}

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.delete(input)
    return data
}