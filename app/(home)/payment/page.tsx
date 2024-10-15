import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PaymentForm from "./_components/payment-form";

interface Props {
    searchParams: {
        userId: string;
        serviceId: string;
    }
}

const Payment = async ({ searchParams: { userId, serviceId } }: Props) => {

    if (!userId || !serviceId) return redirect("/")

    const [user, service] = await Promise.all([
        db.user.findUnique({
            where: {
                id: userId
            }
        }),
        db.service.findUnique({
            where: {
                id: serviceId
            }
        })
    ])

    if (!user || !service) return redirect("/")

    return (
        <div className="w-full max-w-screen-xl min-h-[80vh] mx-auto mt-6 flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>
                        Payment for {service.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentForm amount={service.price} userId={userId} serviceId={serviceId} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment
