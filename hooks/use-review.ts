import { create } from "zustand";

interface CreateReviewState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useCreateReview = create<CreateReviewState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface IsReviewedState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useIsReviewed = create<IsReviewedState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
