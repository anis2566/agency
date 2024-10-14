"use client";

import { Category, CategoryStatus } from "@prisma/client";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { useCategory } from "@/hooks/use-category";
import { EmptyData } from "@/components/empty-data";

interface CategoryWithCount extends Category {
    services: { id: string }[];
}

interface Props {
    categories: CategoryWithCount[];
}

export const CategoryList = ({ categories }: Props) => {
    const { onOpen } = useCategory();

    if (categories.length < 1) return <EmptyData title="No Category Found" />;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-2">Image</TableHead>
                    <TableHead className="px-2">Name</TableHead>
                    <TableHead className="px-2">Services</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell className="px-2 py-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={category.thumbnail} />
                                <AvatarFallback>{category.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="px-2 py-2">{category.name}</TableCell>
                        <TableCell className="px-2 py-2">
                            {category.services.length}
                        </TableCell>
                        <TableCell className="px-2 py-2">
                            <Badge
                                variant={
                                    category.status === CategoryStatus.Published
                                        ? "default" :
                                        category.status === CategoryStatus.Draft
                                            ? "outline"
                                            : "destructive"
                                }
                            >
                                {category.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="px-2 py-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/category/edit/${category.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(category.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-rose-500" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
