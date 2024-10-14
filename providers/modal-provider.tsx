"use client";

import { DeleteCategoryModal } from "@/app/dashboard/category/_components/delete-modal";
import { DeleteServiceModal } from "@/app/dashboard/service/_components/delete-modal";

export const ModalProvider = () => {
    return (
        <>
            <DeleteCategoryModal />
            <DeleteServiceModal />
        </>
    );
};
