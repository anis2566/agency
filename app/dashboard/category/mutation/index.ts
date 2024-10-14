import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  CREATE_CATEGORY_ACTION,
  DELETE_CATEGORY_ACTION,
  UPDATE_CATEGORY_ACTION,
} from "../action";

export const useCreateCategory = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        router.push("/dashboard/category");
      } else {
        toast.error(data.error);
      }
    },
  });
};

export const useUpdateCategory = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: UPDATE_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push("/dashboard/category");
      }
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: DELETE_CATEGORY_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    },
  });
};
