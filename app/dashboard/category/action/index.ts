"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

import { CategorySchema, CategorySchemaType } from "@/schema/category.schema";

export const CREATE_CATEGORY_ACTION = async (values: CategorySchemaType) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const category = await db.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        error: "Category already exists",
      };
    }

    await db.category.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/category");

    return {
      success: "Category created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create category",
    };
  }
};

type UpdateCategory = {
  id: string;
  values: CategorySchemaType;
};
export const UPDATE_CATEGORY_ACTION = async ({
  id,
  values,
}: UpdateCategory) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category)
      return {
        error: "Category not found",
      };

    await db.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/category");

    return {
      success: "Category updated",
    };
  } catch (error) {
    return {
      error: "Failed to update category",
    };
  }
};

export const DELETE_CATEGORY_ACTION = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        error: "Category not found",
      };
    }

    await db.category.delete({ where: { id } });

    revalidatePath("/dashboard/category");

    return {
      success: "Category deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete category",
    };
  }
};
