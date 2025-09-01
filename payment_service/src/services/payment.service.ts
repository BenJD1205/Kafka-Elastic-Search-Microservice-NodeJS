import { PaymentGateway } from './../types';
import { GetOrderDetails } from "../utils";
import { MessageType } from "../types";

export const CreatePayment = async (userId: number, orderId: number, paymentGateway: PaymentGateway) => {
    //get order details from order service
    const order = await GetOrderDetails(orderId);
    if (order.customerId !== userId) {
        throw new Error("User not authorized to create payment")
    }

    //create a new payment record

    //call payment gateway to create payment

    //return payment secrets
    return {
        secret: "my super secret",
        pubKey: "my super public key",
        amount: 100,
    }
}

export const VerifyPayment = async (paymentId: string, paymentGateway: unknown) => {
    //call payment Gateway to verify payment
    //update order status through message broker
    //return payment status <= not necessary just for response to frontend
}

export const HandleSubscription = async (message: MessageType) => { }