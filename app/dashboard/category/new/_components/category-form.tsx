"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { CategoryStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { CategorySchema } from "@/schema/category.schema";
import { LoadingButton } from "@/components/loading-button";
import { useCreateCategory } from "../../mutation";


export const CategoryForm = () => {

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
            thumbnail: "",
            status: undefined,
        },
    });
    const { mutate, isPending } = useCreateCategory();

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Category</CardTitle>
                <CardDescription>
                    Add a new category to organize your content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="grid flex-1 items-start gap-4 md:gap-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter category name"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell about category"
                                            className="resize-none"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Thumbnail</FormLabel>
                                    <FormControl>
                                        {form.getValues("thumbnail") ? (
                                            <div className="relative mt-2">
                                                <Image
                                                    alt="Upload"
                                                    width={120}
                                                    height={120}
                                                    className="mx-auto rounded-md object-contain"
                                                    src={form.getValues("thumbnail")}
                                                />
                                                <TooltipProvider delayDuration={0}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                className="absolute right-0 top-0"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => form.setValue("thumbnail", "")}
                                                                disabled={isPending}
                                                                type="button"
                                                            >
                                                                <Trash className="text-rose-500" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Remove Image</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url);
                                                    toast.success("Image uploaded");
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error("Image upload failed");
                                                }}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.values(CategoryStatus).map((status) => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
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
                            title="Create"
                            loadingTitle="Creating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                            className="max-w-fit"
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
