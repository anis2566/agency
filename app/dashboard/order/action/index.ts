"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type UpdateOrderStatus = {
  id: string;
  status: OrderStatus;
};

export const UPDATE_ORDER_STATUS_ACTION = async ({
  id,
  status,
}: UpdateOrderStatus) => {
  try {
    const order = await db.order.findUnique({
      where: { id },
    });

    if (!order) {
      return {
        error: "Order not found",
      };
    }

    await db.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/order");

    return {
      success: "Status updated",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update order status",
    };
  }
};
