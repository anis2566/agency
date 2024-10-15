import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/ky";
import { ServicePage } from "@/lib/types";
import { GET_CATEGORY_ACTION } from "@/app/dashboard/service/action";

interface Props {
  category: string | null;
  search: string | null;
  sort: string | null;
}

export const useGetServices = ({ category, search, sort }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["get-services", category, search, sort],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/services", {
          searchParams: {
            ...(pageParam && { cursor: pageParam }),
            ...(search && { search }),
            ...(category && { category }),
            ...(sort && { sort }),
          },
        })
        .json<ServicePage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  const services = data?.pages.flatMap((page) => page.services) || [];

  return {
    services,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await GET_CATEGORY_ACTION(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
