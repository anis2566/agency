import { redirect } from "next/navigation";

import { DashboardLayout } from "./_components/dashboard-layout";
import { auth } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || !session.userId) {
        redirect("/");
    }
    return (
        <DashboardLayout>{children}</DashboardLayout>
    );
}
