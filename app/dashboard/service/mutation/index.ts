import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  CREATE_SERVICE_ACTION,
  DELETE_SERVICE_ACTION,
  UPDATE_SERVICE_ACTION,
} from "../action";

export const useCreateService = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_SERVICE_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push(`/dashboard/service`);
      }
    },
  });
};

export const useUpdateService = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: UPDATE_SERVICE_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push("/dashboard/service");
      }
    },
  });
};

export const useDeleteService = () => {
  return useMutation({
    mutationFn: DELETE_SERVICE_ACTION,
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
