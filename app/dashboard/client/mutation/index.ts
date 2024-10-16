import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_CLIENT_ACTION } from "../action";

interface Props {
  onClose: () => void;
}

export const useDeleteClientMutation = ({ onClose }: Props) => {
  return useMutation({
    mutationFn: DELETE_CLIENT_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        onClose();
      }
    },
  });
};
