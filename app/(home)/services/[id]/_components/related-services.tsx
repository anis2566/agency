"use client";

import { ServiceCard, ServiceCardSkeletonList } from "@/app/(home)/_components/services/service-card";
import { useGetRelatedServices } from "../../mutation";

interface Props {
    categoryId: string;
}

export const RelatedServices = ({ categoryId }: Props) => {
    const { data, isLoading } = useGetRelatedServices({ categoryId });

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Related Services</h1>
            {
                isLoading ? <ServiceCardSkeletonList /> : (
                    <div className="grid gap-4 md:grid-cols-4">
                        {data?.map((service, i) => (
                            <ServiceCard key={i} service={service} />
                        ))}
                    </div>
                )
            }
        </div>
    )
};
