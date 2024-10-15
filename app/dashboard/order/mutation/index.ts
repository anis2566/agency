import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { UPDATE_ORDER_STATUS_ACTION } from "@/app/dashboard/order/action";

interface UpdateOrderStatus {
  onClose: () => void;
}

export const useUpdateOrderStatus = ({ onClose }: UpdateOrderStatus) => {
  return useMutation({
    mutationFn: UPDATE_ORDER_STATUS_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        onClose();
      }
    },
  });
};
