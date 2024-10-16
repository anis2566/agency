"use server";

import { PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { ReviewSchemaType, ReviewSchema } from "@/schema/review.schema";
import { GET_USER } from "@/services/user.service";

type CreateReview = {
  serviceId: string;
  values: ReviewSchemaType;
};

export const CREATE_REVIEW_ACTION = async ({
  serviceId,
  values,
}: CreateReview) => {
  const { data, success } = ReviewSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const { userId } = await GET_USER();

    const isBougth = await db.order.findFirst({
      where: {
        userId: userId,
        serviceId: serviceId,
        paymentStatus: PaymentStatus.Paid,
      },
    });

    if (!isBougth) {
      return {
        error: "You must buy this service to review",
      };
    }

    const isReviewed = await db.review.findFirst({
      where: {
        userId: userId,
        serviceId: serviceId,
      },
    });

    if (isReviewed) {
      return {
        error: "You already reviewed this service",
      };
    }

    await db.review.create({
      data: {
        userId: userId,
        serviceId: serviceId,
        ...data,
      },
    });

    const totalReviews = await db.review.count({
      where: {
        serviceId,
      },
    });

    const averageRating = await db.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    const avgRating = averageRating._avg.rating ?? 0;
    const newRating =
      Math.floor(
        ((avgRating * (totalReviews - 1) + data.rating) / totalReviews) * 2,
      ) / 2;

    await db.service.update({
      where: {
        id: serviceId,
      },
      data: {
        rating: newRating,
      },
    });

    revalidatePath(`/services/${serviceId}`);

    return {
      success: "Review submitted",
    };
  } catch (error) {
    return {
      error: "Failed to create review",
    };
  }
};

export const GET_RELATED_SERVICES_ACTION = async (categoryId: string) => {
  const services = await db.service.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      rating: "asc",
    },
    include: {
      category: true,
      reviews: true,
    },
    take: 4,
  });

  console.log(services);

  return services;
};
