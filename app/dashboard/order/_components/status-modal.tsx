"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderStatus } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOrder } from "@/hooks/use-order";
import { LoadingButton } from "@/components/loading-button";
import { useUpdateOrderStatus } from "../mutation";

const formSchema = z.object({
    status: z.nativeEnum(OrderStatus).refine((value) => Object.values(OrderStatus).includes(value), {
        message: "required",
    }),
});

export const OrderStatusModal = () => {
    const { open, id, onClose } = useOrder();
    const { mutate, isPending } = useUpdateOrderStatus({ onClose });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        mutate({ id, status: values.status });
    };

    return (
        <Dialog open={open && !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Status</DialogTitle>
                    <DialogDescription>
                        Change the status of the order
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.values(OrderStatus).map((status) => (
                                                    <SelectItem key={status} value={status} disabled={status === OrderStatus.Pending}>
                                                        {status}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            isLoading={isPending}
                            title="Update"
                            loadingTitle="Updating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
