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
import { EditCategoryForm } from "./_components/edit-category-form";

export const metadata: Metadata = {
    title: "Agency | Category | Edit",
    description: "Agency category edit page.",
};


interface Props {
    params: {
        id: string;
    };
}

const EditCategory = async ({ params: { id } }: Props) => {
    const category = await db.category.findUnique({
        where: {
            id,
        },
    });

    if (!category) redirect("/admin");

    return (
        <ContentLayout title="Category">
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
                            <Link href="/dashboard/category">Category</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditCategoryForm category={category} />
        </ContentLayout>
    );
};

export default EditCategory;
