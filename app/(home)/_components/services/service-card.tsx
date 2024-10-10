import Image from "next/image";
import { Rating } from "@smastrom/react-rating";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  image: string;
}

export const ServiceCard = ({ title, description, image }: Props) => {
  return (
    <Card className="w-full rounded-sm border-s-muted shadow-none transition-all duration-300 hover:shadow-md">
      <CardContent className="w-full space-y-4 p-4">
        <div className="relative aspect-square h-[150px] w-full">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
        <h1 className="text-center text-xl font-bold">{title}</h1>
        <p className="mx-auto max-w-[300px] text-start text-sm text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Rating style={{ maxWidth: 70 }} value={4} readOnly />
            <p className="text-xs text-muted-foreground">(45 reviews)</p>
          </div>
          <Button variant="linkHover2" className="ml-auto flex">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
