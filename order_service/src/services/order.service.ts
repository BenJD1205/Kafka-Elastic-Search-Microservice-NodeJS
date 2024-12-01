import { OrderLineItemType, OrderWithLineItems } from "src/dto/orderRequest.dto"
import { CartRepositoryType, MessageType, OrderRepositoryType, OrderStatus } from "src/types"

export const CreateOrder = async (userId: number, repo: OrderRepositoryType, cartRepo: CartRepositoryType) => {
    //find cart by customer id
    const cart = await cartRepo.findCart(userId);
    if (!cart) throw new Error("Cart not found");

    //calculate total order amount
    let cartTotal = 0;
    let orderLineItems: OrderLineItemType[] = [];

    //create orderline items from cart items
    cart.lineItems.forEach((item) => {
        cartTotal += item.qty * Number(item.price);
        orderLineItems.push({
            productId: item.productId,
            itemName: item.itemName,
            qty: item.qty,
            price: item.price,
        } as OrderLineItemType)
    })

    const orderNumber = Math.floor(Math.random() * 1000000)

    //create order with line items

    const orderInput: OrderWithLineItems = {
        orderNumber: orderNumber,
        txnId: null,
        status: OrderStatus.PENDING,
        customerId: userId,
        amount: cartTotal.toString(),
        orderItems: orderLineItems,
    }

    const order = await repo.createOrder(orderInput);
    await cartRepo.clearCartData(userId);

    //fire a message to subscription service [catalog service] to update stock
    // await repo.publishOrderEvent(order, "ORDER_CREATED");

    return { message: "Order created successfully", orderNumber: orderNumber };
}

export const GetOrder = async (orderId: number, repo: OrderRepositoryType) => {
    const order = await repo.findOrder(orderId);
    if (!order) throw new Error("Order not found");
    return order;
}

export const GetOrders = async (userId: number, repo: OrderRepositoryType) => {
    const orders = await repo.findOrdersByCustomerId(userId);
    if (!Array.isArray(orders)) throw new Error("Orders not found")
    return orders
}

export const UpdateOrder = async (orderId: number, status: OrderStatus, repo: OrderRepositoryType) => {
    await repo.updateOrder(orderId, status);

    //fire a message to subscription service [catalog service] to update stock
    //TODO: handle Kafka calls
    if (status === OrderStatus.CANCELLED) {
        //await repo.publishOrderEvent(order, "ORDER_CANCELLED")
    }
    return { message: 'Order updated successfully' }
}

export const DeleteOrder = async (orderId: number, repo: OrderRepositoryType) => {
    await repo.deleteOrder(orderId);
    return { message: 'Order deleted successfully' }
}

export const HandleSubscription = async (message: MessageType) => { }