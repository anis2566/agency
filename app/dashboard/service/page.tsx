import { Metadata } from "next";
import Link from "next/link";
import { ServiceStatus } from "@prisma/client";

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
import { CustomPagination } from "@/components/custom-pagination";
import { ServiceList } from "./_components/service-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "Agency | Service",
    description: "Agency category page.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
        status?: ServiceStatus;
        categoryId?: string;
    };
}

const Service = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5", categoryId, status } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [services, totalService] = await Promise.all([
        db.service.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(categoryId && { categoryId }),
                ...(status && { status }),
            },
            include: {
                category: true
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.service.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
            },
        }),
    ]);

    const totalPage = Math.ceil(totalService / itemsPerPage);

    return (
        <ContentLayout title="Service">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Service</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Services</CardTitle>
                    <CardDescription>
                        Manage and organize your services
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ServiceList services={services} />
                    <CustomPagination totalPages={totalPage} />
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Service
