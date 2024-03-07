import { CartRepositoryType } from "src/types/repository.type";
const db = {}

const createCart = async (input: any): Promise<{}> => {
    return Promise.resolve({
        message: 'fake response from cart repository',
        input,
    })
}

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}

const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}

const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}

const findCarts = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}


export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart,
}