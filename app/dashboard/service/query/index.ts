import { useQuery } from "@tanstack/react-query";

import { GET_CATEGORY_ACTION } from "../action";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category-for-service"],
    queryFn: async () => await GET_CATEGORY_ACTION(),
  });
};
