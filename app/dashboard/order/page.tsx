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
import { db } from "@/lib/prisma";
import { OrderList } from "./_components/order-list";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "Agency | Order",
    description: "Agency order page.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: OrderStatus;
    };
}

const Orders = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [orders, totalOrder] = await Promise.all([
        db.order.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status }),
            },
            include: {
                service: true,
                user: true,
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.order.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(status && { status }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalOrder / itemsPerPage);

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
                    <Header />
                    <OrderList orders={orders} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Orders
