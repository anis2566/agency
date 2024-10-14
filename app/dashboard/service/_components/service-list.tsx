"use client"

import { Service, Category } from "@prisma/client"
import { EllipsisVertical, Pen, Trash2 } from "lucide-react"
import Link from "next/link"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useService } from "@/hooks/use-service"

interface ServiceWithCategory extends Service {
    category: Category
}

interface Props {
    services: ServiceWithCategory[]
}

export const ServiceList = ({ services }: Props) => {
    const { onOpen } = useService()
    return (
        <Table>
            <TableHeader>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
                {services.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={service.thumbnail} />
                                <AvatarFallback>
                                    {service.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.category.name}</TableCell>
                        <TableCell>${service.price}</TableCell>
                        <TableCell>
                            <Badge>{service.status}</Badge>
                        </TableCell>
                        <TableCell>
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
                                            href={`/dashboard/service/edit/${service.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(service.id)}
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
    )
}
