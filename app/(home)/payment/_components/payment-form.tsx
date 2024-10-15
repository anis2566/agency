"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkout } from "./checkout";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface Props {
    amount: number;
    userId: string;
    serviceId: string;
}

export default function PaymentForm({ amount, userId, serviceId }: Props) {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: amount,
                currency: "usd",
            }}
        >
            <Checkout amount={amount} userId={userId} serviceId={serviceId} />
        </Elements>
    );
}