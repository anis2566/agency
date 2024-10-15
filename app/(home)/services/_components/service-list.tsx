"use client"

import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useGetServices } from "../query";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import { ServiceCard, ServiceCardSkeletonList } from "../../_components/services/service-card";

export const ServiceList = () => {
    const searchParams = useSearchParams();

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const { services, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useGetServices({ category, search, sort })

    const isLoading = isFetching || isFetchingNextPage

    if (isLoading) return <ServiceCardSkeletonList />

    return (
        <div>
            <InfiniteScrollContainer
                className="grid gap-4 md:grid-cols-4"
                onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
            >
                {services.map((service, i) => (
                    <ServiceCard key={i} service={service} />
                ))}
                {isFetchingNextPage && (
                    <div className="flex justify-center">
                        <Loader2 className="mx-auto my-3 animate-spin" />
                    </div>
                )}
            </InfiniteScrollContainer>
        </div>
    )
}