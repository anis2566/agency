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
import { CustomPagination } from "@/components/custom-pagination";
import { ClientList } from "./_components/client-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "Agency | Client",
    description: "Agency client page.",
};

interface Props {
    searchParams: {
        name?: string;
        sort?: string;
        page?: string;
        perPage?: string;
    };
}

const Clients = async ({ searchParams }: Props) => {
    const { name, sort, page = "1", perPage = "5" } = searchParams;

    const itemsPerPage = parseInt(perPage, 10);
    const currentPage = parseInt(page, 10);

    const [clients, totalClients] = await Promise.all([
        db.user.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                orders: {
                    some: {}
                }
            },
            include: {
                orders: {
                    select: {
                        id: true,
                    }
                },
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.user.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalClients / itemsPerPage);

    return (
        <ContentLayout title="Client">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Client</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Clients</CardTitle>
                    <CardDescription>
                        Manage and organize your clients
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ClientList clients={clients} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Clients
