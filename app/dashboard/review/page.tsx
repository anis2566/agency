import { Metadata } from "next";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ContentLayout } from "../_components/content-layout";
import { Header } from "../client/_components/header";
import { db } from "@/lib/prisma";
import { ServiceList } from "./_components/service-list";

export const metadata: Metadata = {
    title: "Agency | Review",
    description: "Agency review page.",
};

const Services = async () => {
    const services = await db.service.findMany({
        include: {
            reviews: {
                select: {
                    id: true,
                },
            },
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });


    return (
        <ContentLayout title="Review">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Review</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Service</CardTitle>
                    <CardDescription>
                        Manage and organize your service review
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ServiceList services={services} />
                    {/* <Header />
                    <OrderList orders={orders} />
                    <CustomPagination totalPages={totalPages} /> */}
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Services
