"use client"

import { useIsReviewed } from "@/hooks/use-review"

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

export const ReviewedModal = () => {
    const { open, onClose } = useIsReviewed()

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Already Reviewed</AlertDialogTitle>
                    <AlertDialogDescription>You have already reviewed this service.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} className="bg-rose-500 text-white hover:bg-rose-600 hover:text-white">
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}