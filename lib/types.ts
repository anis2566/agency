import { Prisma } from "@prisma/client";

export function getServiceDataInclude() {
  return {
    category: true,
    reviews: {
      select: {
        userId: true,
      },
    },
  } satisfies Prisma.ServiceInclude;
}

export type ServiceData = Prisma.ServiceGetPayload<{
  include: ReturnType<typeof getServiceDataInclude>;
}>;

export interface ServicePage {
  services: ServiceData[];
  nextCursor: string | null;
}

export function getReviewDataInclude() {
  return {
    user: true,
    // answers: {
    //   include: getAnswerDataInclude(),
    // },
  } satisfies Prisma.ReviewInclude;
}

export type ReviewData = Prisma.ReviewGetPayload<{
  include: ReturnType<typeof getReviewDataInclude>;
}>;

export interface ReviewPage {
  reviews: ReviewData[];
  previousCursor: string | null;
}
