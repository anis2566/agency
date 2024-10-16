"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_CLIENT_ACTION = async (id: string) => {
  try {
    const client = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        error: "Client not found",
      };
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/client");

    return {
      success: "Client deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete client",
    };
  }
};
