import { OrderWithLineItems } from "src/dto/orderRequest.dto"
import { CartRepositoryType, OrderRepositoryType } from "src/types"

export const CreateOrder = async (userId: number, repo: OrderRepositoryType, cartRepo: CartRepositoryType) => {
    return {};
}

export const GetOrder = async (orderId: number, repo: OrderRepositoryType) => {
    return { message: 'created Order from service' }
}

export const GetOrders = async (userId: number, repo: OrderRepositoryType) => {
    return { message: 'created Order from service' }
}

export const UpdateOrder = async (orderId: number, status: string, repo: OrderRepositoryType) => {
    return { message: 'created Order from service' }
}

export const DeleteOrder = async (orderId: number, repo: OrderRepositoryType) => {
    return { message: 'created Order from service' }
}

export const HandleSubscription = async (message: any) => { }