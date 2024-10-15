import { Metadata } from "next";
import Link from "next/link";

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
import { db } from "@/lib/prisma";
import { OrderList } from "./_components/order-list";

export const metadata: Metadata = {
    title: "Agency | Order",
    description: "Agency order page.",
};


const Orders = async () => {
    const orders = await db.order.findMany({
        include: {
            service: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <ContentLayout title="Order">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Order</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                        Manage and organize your orders
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <OrderList orders={orders} />
                    {/* <Header />
                    <CategoryList categories={categories} />
                    <CustomPagination totalPages={totalPage} /> */}
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Orders
