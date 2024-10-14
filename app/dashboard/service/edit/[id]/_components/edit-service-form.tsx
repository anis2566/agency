"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Service, ServiceStatus } from "@prisma/client"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useState } from "react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { UploadButton } from "@/lib/uploadthing"
import { ServiceSchema, ServiceSchemaType } from "@/schema/service.schema"
import { LoadingButton } from "@/components/loading-button"
import { useGetCategory } from "../../../query"
import { useUpdateService } from "../../../mutation"

interface Props {
    service: Service
}

export const EditServiceForm = ({ service }: Props) => {
    const [value, setValue] = useState<string>("")

    const { data: categories } = useGetCategory()

    const form = useForm<ServiceSchemaType>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            name: service.name,
            description: service.description,
            price: service.price,
            thumbnail: service.thumbnail,
            features: service.features,
            status: service.status,
            categoryId: service.categoryId
        }
    })
    const { mutate, isPending } = useUpdateService()

    const onSubmit = (values: ServiceSchemaType) => {
        mutate({ id: service.id, values })
    }

    const handleAddFeature = (value: string) => {
        if (value) {
            const currentFeatures = form.getValues("features") || [];
            form.setValue("features", [...currentFeatures, value]);
            setValue("");
        }
    }

    const handleRemoveFeature = (index: number) => {
        const currentFeatures = form.getValues("features") || [];
        form.setValue("features", currentFeatures.filter((_, i) => i !== index));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Service</CardTitle>
                <CardDescription>Create a new service</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Textarea {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} onChange={(e) => field.onChange(Number(e.target.value))} type="number" />
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
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        {form.getValues("thumbnail") ? (
                                            <div className="relative aspect-video max-h-[200px]">
                                                <Image
                                                    alt="Upload"
                                                    fill
                                                    className="rounded-md object-cover"
                                                    src={form.getValues("thumbnail")}
                                                />
                                                <Button
                                                    className="absolute right-0 top-0"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => form.setValue("thumbnail", "")}
                                                    type="button"
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="text-rose-500" />
                                                </Button>
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

                        <Card className="shadow-none border-none p-0 space-y-2">
                            <CardHeader className="p-0">
                                <CardTitle>Features</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 p-0">
                                <div className="flex items-center justify-between gap-x-3">
                                    <Input placeholder="add feature..." value={value} onChange={(e) => setValue(e.target.value)} />
                                    <Button type="button" onClick={() => handleAddFeature(value)} disabled={isPending || !value}>
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex flex-col gap-y-2 border p-2 rounded-md">
                                    {
                                        form.watch("features")?.map((feature, index) => (
                                            <div key={index} className="flex items-center justify-between gap-x-3">
                                                <span>{feature}</span>
                                                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                                                    <Trash2 className="w-4 h-4 text-rose-500" />
                                                </Button>
                                            </div>
                                        ))
                                    }
                                    {
                                        form.watch("features")?.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-2">No features added</p>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>

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
                                                Object.values(ServiceStatus).map((status) => (
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
                            title="Update"
                            loadingTitle="Updating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                            className="max-w-fit"
                        />

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

