import Link from "next/link";
import { Category, Service } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { ServiceCard } from "./service-card";
import { cn } from "@/lib/utils";

interface ServiceWithCategory extends Service {
  category: Category
}

interface Props {
  services: ServiceWithCategory[]
}

export const Services = ({ services }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-8 py-20">
      <Badge className="rounded-full px-2 py-1">Services</Badge>

      <h1 className="text-3xl font-bold tracking-wider">Popular Services</h1>

      <div className="grid w-full gap-6 md:grid-cols-4">
        {
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        }
      </div>

      <Link href="/services" className={cn(buttonVariants({ variant: "outline" }))}>
        View All Services
      </Link>
    </div>
  );
};
