import { Service, Category } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ServiceWithCategoryReview extends Service {
    category: Category;
    reviews: { id: string }[];
}

interface Props {
    services: ServiceWithCategoryReview[];
}

export const ServiceList = ({ services }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Unanswered</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {services.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full">{service.category.name}</Badge>
                        </TableCell>
                        <TableCell>{service.reviews.length}</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>
                            <Button variant="outline" size="icon" asChild>
                                <Link href={`/dashboard/review/${service.id}`}>
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
