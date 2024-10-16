import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { CREATE_REVIEW_ACTION, GET_RELATED_SERVICES_ACTION } from "../action";
import { ReviewSchema } from "@/schema/review.schema";
import kyInstance from "@/lib/ky";
import { ReviewPage } from "@/lib/types";

interface Props {
  onClose: () => void;
  form: UseFormReturn<z.infer<typeof ReviewSchema>>;
}

export const useCreateReview = ({ onClose, form }: Props) => {
  return useMutation({
    mutationFn: CREATE_REVIEW_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
        form.reset();
      }
    },
  });
};

export const useGetReviews = ({ serviceId }: { serviceId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["reviews", serviceId],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/reviews/${serviceId}`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<ReviewPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  return {
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  };
};

export const useGetRelatedServices = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  return useQuery({
    queryKey: ["related-services", categoryId],
    queryFn: () => GET_RELATED_SERVICES_ACTION(categoryId),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
