import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditServiceForm } from "./_components/edit-service-form";

export const metadata: Metadata = {
    title: "Agency | Service | Edit",
    description: "Agency service edit page.",
};


interface Props {
    params: {
        id: string;
    };
}

const EditService = async ({ params: { id } }: Props) => {
    const service = await db.service.findUnique({
        where: {
            id,
        },
    });

    if (!service) redirect("/admin");

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/service">Service</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditServiceForm service={service} />
        </ContentLayout>
    );
};

export default EditService;
