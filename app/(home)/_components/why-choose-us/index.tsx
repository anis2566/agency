import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export const WhyChooseUs = () => {
    return <div className="mx-auto w-full max-w-screen-xl flex-col gap-y-8 grid md:grid-cols-2 gap-6 items-center py-20">
        <div>
            <Image src="/why-choose-us.png" alt="why-choose-us" width={500} height={500} />
        </div>
        <div className="space-y-5">
            <Badge variant="outline" className="rounded-full px-3 py-2 border-primary uppercase bg-primary/10 text-primary">Why Choose Us</Badge>
            <h1 className="text-3xl font-bold tracking-wide">Business's Potential with A
                Leading Digital Marketing</h1>
            <p className="text-muted-foreground text-base">Our team of experienced professionals is dedicated to helping
                business achieve higher visibility, increased to traffic, greater.</p>

            <div className="grid md:grid-cols-2 gap-6">
                <Badge variant="outline" className="rounded-full py-1 text-sm flex items-center gap-x-3 max-w-fit">
                    <Badge className="rounded-full bg-primary/10 hover:bg-primary/10">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                    </Badge>
                    <span className="text-md">High Conversion Rate</span>
                </Badge>
                <Badge variant="outline" className="rounded-full py-1 text-sm flex items-center gap-x-3 max-w-fit">
                    <Badge className="rounded-full bg-primary/10 hover:bg-primary/10">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                    </Badge>
                    <span className="text-md">Increase Website Traffic</span>
                </Badge>
                <Badge variant="outline" className="rounded-full py-1 text-sm flex items-center gap-x-3 max-w-fit">
                    <Badge className="rounded-full bg-primary/10 hover:bg-primary/10">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                    </Badge>
                    <span className="text-md">Local Market Dominance</span>
                </Badge>
                <Badge variant="outline" className="rounded-full py-1 text-sm flex items-center gap-x-3 max-w-fit">
                    <Badge className="rounded-full bg-primary/10 hover:bg-primary/10">
                        <CheckCircle2 size={18} className="my-auto text-green-400" />
                    </Badge>
                    <span className="text-md">24/7 Promotion</span>
                </Badge>
            </div>
        </div>
    </div>
};
