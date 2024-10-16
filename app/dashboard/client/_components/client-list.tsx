"use client"

import { User } from "@prisma/client"
import { EllipsisVertical, Trash2 } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useClient } from "@/hooks/use-client"

interface ClientWithOrders extends User {
    orders: { id: string }[]
}

interface Props {
    clients: ClientWithOrders[]
}

export const ClientList = ({ clients }: Props) => {
    const { onOpen } = useClient()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clients.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={client.image || ""} />
                                <AvatarFallback>
                                    {client.name?.charAt(0).toUpperCase() || ""}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.orders.length}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(client.id)}
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