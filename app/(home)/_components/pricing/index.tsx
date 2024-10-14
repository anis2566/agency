import { Badge } from "@/components/ui/badge";

import { PricingCard } from "./pricing-card";

const features = [
  "Unlimited access to all features",
  "Unlimited access to all features",
  "Unlimited access to all features",
  "Unlimited access to all features",
];

export const Pricing = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-8 py-20">
      <Badge className="rounded-full px-2 py-1">Pricing</Badge>
      <h1 className="text-3xl font-bold tracking-wider">Our Pricing Plans</h1>
      <div className="grid w-full gap-6 md:grid-cols-4">
        <PricingCard
          title="Online Marketing"
          description="Starting at"
          discount={10}
          price={250}
          features={features}
        />
        <PricingCard
          title="SEO Optimization"
          description="Starting at"
          discount={5}
          price={100}
          features={features}
        />
        <PricingCard
          title="Data Analysis"
          description="Starting at"
          discount={20}
          price={50}
          features={features}
        />
        <PricingCard
          title="Lead Generation"
          description="Starting at"
          discount={40}
          price={70}
          features={features}
        />
      </div>
    </div>
  );
};
