import { CheckCircle2 } from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  price: number;
  features: string[];
  discount: number;
}

export const PricingCard = ({
  title,
  description,
  price,
  features,
  discount,
}: Props) => {
  return (
    <Card
      className={cn(
        `"border-zinc-700 mx-auto flex w-72 flex-col justify-between py-1 shadow-sm sm:mx-0`,
        {
          "animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
            discount,
        },
      )}
    >
      <div>
        <CardHeader className="pb-8 pt-4">
          <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
            {title}
          </CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">${price}</h3>
            {discount && (
              <Badge variant="outline" className="h-6 rounded-full py-0">{discount}% off</Badge>
            )}
          </div>
          <CardDescription className="pt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button variant="outline" className="w-full">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);
