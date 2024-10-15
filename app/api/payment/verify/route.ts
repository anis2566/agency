import { PaymentStatus } from "@prisma/client";
import { Month } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const serviceId = searchParams.get("serviceId");
  const paymentIntentId = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  if (!userId || !serviceId || !paymentIntentId || !redirectStatus)
    return NextResponse.json(
      {
        error:
          "Missing userId or serviceId or paymentIntentId or redirectStatus",
      },
      { status: 400 },
    );

  if (redirectStatus === "succeeded") {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      await db.order.create({
        data: {
          session: new Date().getFullYear(),
          month: Object.values(Month)[new Date().getMonth()],
          userId,
          serviceId,
          paymentStatus: PaymentStatus.Paid,
        },
      });
      return NextResponse.redirect(new URL("/payment/success", request.url));
    } else {
      return NextResponse.redirect(new URL("/payment/failed", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/payment/failed", request.url));
  }
}
