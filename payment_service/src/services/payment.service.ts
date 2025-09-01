import { PaymentGateway } from './../types';
import { GetOrderDetails } from "../utils";
import { MessageType } from "../types";
import { SendPaymentUpdateMessage } from './broker.service';

export const CreatePayment = async (userId: number, orderId: number, paymentGateway: PaymentGateway) => {
    //get order details from order service
    const order = await GetOrderDetails(orderId);
    if (order.customerId !== userId) {
        throw new Error("User not authorized to create payment")
    }

    //create a new payment record
    const amountInCents = order.amount * 100;
    const orderMetaData = {
        orderNumber: order.orderNumber,
        userId: userId,
    }

    //call payment gateway to create payment
    const paymentResponse = await paymentGateway.createPayment(
        amountInCents,
        orderMetaData,
    )

    //return payment secrets
    return {
        secret: paymentResponse.secret,
        pubKey: paymentResponse.pubKey,
        amount: 100,
        order: order,
    }
}

export const VerifyPayment = async (paymentId: string, paymentGateway: PaymentGateway) => {
    const paymentResponse = await paymentGateway.getPayment(paymentId);

    //update order status through message broker

    await SendPaymentUpdateMessage({
        orderNumber: paymentResponse.orderNumber,
        status: paymentResponse.status,
        paymentLog: paymentResponse.paymentLog,
    })
    return {
        message: "Payment verified",
        status: paymentResponse.status,
        paymentLog: paymentResponse.paymentLog,
    }
}

export const HandleSubscription = async (message: MessageType) => { }