import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { db } from "@/lib/prisma";
import { Preview } from "@/components/preview";
import BuyButton from "./_components/buy-button";
import { Reviews } from "./_components/reviews";

export const metadata: Metadata = {
    title: "Agency | Services | Details",
    description: "Agency Service Details",
};

interface Props {
    params: {
        id: string;
    }
}

const ServiceDetails = async ({ params: { id } }: Props) => {

    const service = await db.service.findUnique({
        where: {
            id: id
        },
        include: {
            category: true,
        }
    })

    if (!service) return redirect("/services")

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-6 space-y-10">
            <div className="w-full grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{service.name}</h1>
                        <Badge variant="outline" className="rounded-full">{service.category.name}</Badge>
                        <p className="font-semibold">${service.price}</p>
                    </div>
                    <div className="w-full aspect-video relative max-h-[400px]">
                        <Image src={service.thumbnail} alt={service.name} fill className="object-contain" />
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Service Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Preview value={service.features} />
                    </CardContent>
                </Card>
            </div>

            <BuyButton price={service.price} serviceId={service.id} />

            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                    <Preview value={service.description} />
                </TabsContent>
                <TabsContent value="reviews">
                    <Reviews serviceId={service.id} rating={service.rating} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ServiceDetails
