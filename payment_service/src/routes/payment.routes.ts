import express, { Request, Response, NextFunction } from "express";
import * as service from "../services/payment.service";
import { RequestAuthorizer } from "../middlewares";
import { PaymentGateway } from "../types";
import { StripePayment } from "../utils";

const router = express.Router();
const paymentGateway: PaymentGateway = StripePayment;

router.post("/create-payment", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) throw new Error("User not found")
        const { orderNumber } = req.body;
        const response = await service.CreatePayment(user.id, orderNumber, paymentGateway)
        res.status(200).json({
            message: 'Create payment successfully',
            data: response,
        });
    } catch (err) {
        next(err);
    }
});

router.get("/verify-payment/:id", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) throw new Error("User not found")
        const paymentId = req.params.id;
        if (!paymentId) throw new Error("Payment ID not found")
        await service.VerifyPayment(paymentId, paymentGateway);
        res.status(200).json({ message: "Payment verification completed" })
    } catch (err) {
        next(err);
    }
})

export default router;