"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button"

interface BuyButtonProps {
    price: number;
    serviceId: string;
}

export default function BuyButton({ price, serviceId }: BuyButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const session = useSession()
    const router = useRouter()

    const handleBuy = async () => {
        setIsLoading(true)
        if (session && session.status === "authenticated") {
            router.push(`/payment?userId=${session.data.userId}&serviceId=${serviceId}`)
            setIsLoading(false)
        } else {
            router.push(`/auth/sign-in?callbackUrl=/services/${serviceId}`)
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={handleBuy} disabled={isLoading}>
            Buy with ${price}
        </Button>
    )
}
