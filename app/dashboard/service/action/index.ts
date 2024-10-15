"use server";

import { revalidatePath } from "next/cache";
import { CategoryStatus } from "@prisma/client";

import { db } from "@/lib/prisma";
import { ServiceSchema, ServiceSchemaType } from "@/schema/service.schema";

export const CREATE_SERVICE_ACTION = async (values: ServiceSchemaType) => {
  const { data, success } = ServiceSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const service = await db.service.findFirst({
      where: {
        name: data.name,
      },
    });

    if (service) {
      return {
        error: "Service already exists",
      };
    }

    await db.service.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/service");

    return {
      success: "Service created",
    };
  } catch (error) {
    return {
      error: "Failed to create service",
    };
  }
};

type UpdateService = {
  id: string;
  values: ServiceSchemaType;
};
export const UPDATE_SERVICE_ACTION = async ({ id, values }: UpdateService) => {
  const { data, success } = ServiceSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const service = await db.service.findUnique({
      where: {
        id,
      },
    });

    if (!service)
      return {
        error: "Service not found",
      };

    await db.service.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/service");

    return {
      success: "Service updated",
    };
  } catch (error) {
    return {
      error: "Failed to update service",
    };
  }
};

export const DELETE_SERVICE_ACTION = async (id: string) => {
  try {
    const service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      return {
        error: "Service not found",
      };
    }

    await db.service.delete({ where: { id } });

    revalidatePath("/dashboard/service");

    return {
      success: "Service deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete service",
    };
  }
};

export const GET_CATEGORY_ACTION = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Published,
    },
  });

  return categories;
};
