"use client";

import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

const PaymentFail = () => {
    const callback = useSearchParams().get("callback");
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timer);
                    router.push(callback || "/");
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [callback, router]);

    return (
        <div className="flex h-[80vh] flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardContent className="space-y-6 p-6">
                    <div className="flex flex-col items-center justify-center">
                        <XCircle className="h-12 w-12 text-red-500" />
                        <h2 className="mt-4 text-2xl font-bold">Payment Failed</h2>
                        <p className="mt-2 text-center text-muted-foreground">
                            We&apos;re sorry, but your payment could not be processed
                            successfully.
                        </p>
                        <p className="mt-4 text-center text-muted-foreground">
                            Redirecting in <span className="font-bold">{countdown}</span>{" "}
                            seconds...
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentFail;
