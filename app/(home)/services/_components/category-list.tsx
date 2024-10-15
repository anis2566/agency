"use client";

import Image from "next/image";
import queryString from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useGetCategories } from "../query";

export const CategoryList = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: categories, isLoading } = useGetCategories()

    const handleClick = (category: string) => {
        if (searchParams.get("category") === category) {
            router.push(pathname);
        } else {
            const url = queryString.stringifyUrl(
                {
                    url: pathname,
                    query: {
                        category,
                    },
                },
                { skipEmptyString: true, skipNull: true },
            );
            router.push(url);
        }
    };

    if (isLoading) return <CategorySkeleton />

    return (
        <ScrollArea>
            <div className="flex flex-1 items-center gap-x-3 whitespace-nowrap pb-3">
                {categories?.map((category) => {
                    const active = searchParams.get("category") === category.name;
                    return (
                        <Badge
                            key={category.id}
                            className={cn(
                                "flex h-8 cursor-pointer items-center gap-x-2 rounded-full border-primary p-2",
                            )}
                            variant={active ? "default" : "outline"}
                            onClick={() => handleClick(category.name)}
                        >
                            <Image
                                src={category.thumbnail}
                                alt="Category"
                                height={20}
                                width={20}
                                className="rounded-full"
                            />
                            {category.name}
                        </Badge>
                    );
                })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

const CategorySkeleton = () => {
    return (
        <div className="flex items-center gap-x-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="flex h-10 w-24 cursor-pointer items-center gap-x-2 rounded-full border-primary p-2"
                />
            ))}
        </div>
    );
};
