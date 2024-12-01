import { eq } from "drizzle-orm";
import { DB } from "src/db/db.connection";
import { orderLineItems, orders } from "src/db/schema";
import { OrderWithLineItems } from "src/dto/orderRequest.dto";
import { OrderRepositoryType } from "src/types";

const createOrder = async (lineItem: OrderWithLineItems): Promise<number> => {
    const result = await DB.insert(orders).values({
        customerId: lineItem.customerId,
        orderNumber: lineItem.orderNumber,
        status: lineItem.status,
        txnId: lineItem.txnId,
        amount: lineItem.amount,
    }).returning();

    const [{ id }] = result;

    if (id > 0) {
        for (const item of lineItem.orderItems) {
            await DB.insert(orderLineItems).values({
                orderId: id,
                itemName: item.itemName,
                price: item.price,
                qty: item.qty,
            }).execute()
        }
    }
    return id;
}

const findOrder = async (id: number): Promise<OrderWithLineItems | null> => {
    const order = await DB.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.id, id),
        with: {
            lineItems: true
        }
    })
    if (!order) throw new Error("Order not found")
    return order as unknown as OrderWithLineItems;
}

const updateOrder = async (id: number, status: string): Promise<OrderWithLineItems> => {
    await DB.update(orders).set({
        status: status,
    }).where(eq(orders.id, id)).execute()
    const order = await findOrder(id);
    if (!order) throw new Error("Order not found");
    return order;
}

const deleteOrder = async (id: number): Promise<boolean> => {
    await DB.delete(orders).where(eq(orders.id, id)).execute();
    return true;
}

const findOrdersByCustomerId = async (customerId: number): Promise<OrderWithLineItems[]> => {
    const orders = await DB.query.orders.findMany({
        where: (orders, { eq }) => eq(orders.customerId, customerId),
        with: {
            lineItems: true,
        }
    })
    return orders as unknown as OrderWithLineItems[];
}

export {
    createOrder,
    updateOrder,
    findOrder,
    findOrdersByCustomerId,
    deleteOrder,
}