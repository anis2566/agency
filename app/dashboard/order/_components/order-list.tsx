"use client"

import { Order, OrderStatus, PaymentStatus, Service, User } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisVertical, RefreshCcw } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useOrder } from "@/hooks/use-order";

interface OrderWithServiceAndUser extends Order {
    service: Service;
    user: User;
}

interface Props {
    orders: OrderWithServiceAndUser[];
}

export const OrderList = ({ orders }: Props) => {
    const { onOpen } = useOrder();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.service.name}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-1">
                                <Avatar>
                                    <AvatarImage src={order.user.image || ""} />
                                    <AvatarFallback>
                                        {order.user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{order.user.name}</p>
                                    <p className="text-muted-foreground">{order.user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={order.paymentStatus === PaymentStatus.Paid ? "default" : order.paymentStatus === PaymentStatus.Pending ? "outline" : "destructive"}
                                className="rounded-full"
                            >
                                {order.paymentStatus}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={order.status === OrderStatus.Pending ? "outline" : order.status === OrderStatus.Processing ? "default" : order.status === OrderStatus.Completed ? "default" : "destructive"}
                                className="rounded-full"
                            >
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{format(order.createdAt, "dd MMM yyyy")}</TableCell>
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
                                        onClick={() => onOpen(order.id)}
                                    >
                                        <RefreshCcw className="h-4 w-4" />
                                        Change Status
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