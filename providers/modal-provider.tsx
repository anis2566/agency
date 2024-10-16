"use client";

import { ReviewModal } from "@/app/(home)/services/[id]/_components/review-modal";
import { ReviewedModal } from "@/app/(home)/services/[id]/_components/reviewed-modal";
import { DeleteCategoryModal } from "@/app/dashboard/category/_components/delete-modal";
import { DeleteClientModal } from "@/app/dashboard/client/_components/delete-modal";
import { OrderStatusModal } from "@/app/dashboard/order/_components/status-modal";
import { DeleteServiceModal } from "@/app/dashboard/service/_components/delete-modal";

export const ModalProvider = () => {
    return (
        <>
            <DeleteCategoryModal />
            <DeleteServiceModal />
            <OrderStatusModal />
            <ReviewModal />
            <ReviewedModal />
            <DeleteClientModal />
        </>
    );
};
