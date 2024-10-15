import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { Category, Service } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceWithCategory extends Service {
  category: Category
  reviews: { userId: string }[]
}

interface Props {
  service: ServiceWithCategory;
}

export const ServiceCard = ({ service }: Props) => {
  return (
    <Card className="w-full rounded-sm border-s-muted shadow-none transition-all duration-300 hover:shadow-md h-[340px]">
      <CardContent className="w-full p-4 h-full">
        <Link href={`/services/${service.id}`} className="h-full flex flex-col justify-between">
          <div className="space-y-1">
            <div className="relative aspect-square h-[150px] w-full">
              <Image src={service.thumbnail} alt={service.name} fill className="object-contain" />
            </div>
            <Badge variant="default" className="rounded-full px-2 py-1 bg-primary/70">{service.category.name}</Badge>
            <h1 className="text-start text-xl font-bold">{service.name}</h1>
            <p className="mx-auto max-w-[300px] text-start text-sm text-muted-foreground">
              {service.description.length > 80 ? `${service.description.substring(0, 80)}...` : service.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Rating style={{ maxWidth: 70 }} value={service.rating} readOnly />
              <p className="text-xs text-muted-foreground">({service.reviews?.length ?? 0} reviews)</p>
            </div>
            <p className="text-md font-bold">${service.price}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};


const ServiceCardSkeleton = () => {
  return (
    <Card className="w-full rounded-sm border-s-muted shadow-none transition-all duration-300 hover:shadow-md h-[340px]">
      <CardContent className="w-full p-4 h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-[150px] w-full bg-gray-200 animate-pulse rounded-sm"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-sm"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-sm"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-sm"></div>
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-sm"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-sm"></div>
        </div>
      </CardContent>
    </Card>
  )
}


export const ServiceCardSkeletonList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  )
}
