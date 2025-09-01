import axios from "axios";
import { APIError, AuthorizeError, NotFoundError } from "../error";
import { User } from "../../dto/user.model";
import { InProcessOrder } from "src/dto/order.model";

const ORDER_SERVICE_BASE_URL =
    process.env.ORDER_SERVICE_BASE_URL || "http://localhost:9002"; // env variable

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000";

export const GetOrderDetails = async (orderNumber: number) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_BASE_URL}/orders/${orderNumber}/checkout`, {
        })

        if (response.status !== 200) {
            throw new AuthorizeError("User not authorized");
        }

        return response.data as InProcessOrder;
    }
    catch (error) {
        throw new AuthorizeError("User not authorized");
    }
}

export const ValidateUser = async (token: string) => {
    try {
        // axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
            headers: {
                Authorization: token,
            }
        })

        if (response.status !== 200) {
            throw new AuthorizeError("User not authorized");
        }

        return response.data as User;
    }
    catch (error) {
        throw new AuthorizeError("User not authorized");
    }
}