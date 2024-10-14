import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export const Team = () => {
    return <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-8 py-20">
        <Badge className="rounded-full px-2 py-1">Our Team</Badge>
        <h1 className="text-3xl font-bold tracking-wider">Meet Our Team</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
            <div className="border rounded-lg p-2 bg-gray-100 dark:bg-background/80 relative">
                <div className="aspect-square relative h-[200px] mx-auto ring-2 my-6 rounded-full ring-primary">
                    <Image src="/lead-generation.png" alt="Team Member 1" fill className="object-contain" />
                </div>
                <div className="absolute -bottom-10 left-0 right-0 p-2 bg-white w-[90%] mx-auto rounded-lg border dark:bg-accent">
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-sm text-gray-500">CEO</p>
                </div>
            </div>
        </div>
    </div>
}