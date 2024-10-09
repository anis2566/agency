import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BarChart, Target, Zap } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export const Hero = () => {
    return (
        <div className="w-full h-[80vh] max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Boost Your Digital Presence
                    </h1>
                    <p className="max-w-[600px] md:text-xl">
                        We craft data-driven strategies to elevate your brand, engage your audience, and drive measurable results.
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button asChild variant="outline">
                        <Link href="/services">Our Services</Link>
                    </Button>
                    <Button asChild variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">
                        <Link href="/contact">Get Started</Link>
                    </Button>
                </div>
                <div className="flex items-center md:space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                        <BarChart className="h-5 w-5" />
                        <span className="text-sm">Data-Driven</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span className="text-sm">Fast Results</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span className="text-sm">Targeted Campaigns</span>
                    </div>
                </div>
            </div>
            <div className="relative aspect-video flex items-center justify-center">
                <Image src="/hero.gif" alt="Hero" fill className="bg-transparent object-contain" />
            </div>
        </div>
    );
};
