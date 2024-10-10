import { Badge } from "@/components/ui/badge";

import { ServiceCard } from "./service-card";

export const Services = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-8 py-20">
      <Badge className="rounded-full px-2 py-1">Services</Badge>

      <h1 className="text-3xl font-bold tracking-wider">Popular Services</h1>

      <div className="grid w-full gap-6 md:grid-cols-4">
        <ServiceCard
          title="Online Marketing"
          description="Get high rankings with multi-team collaboration that will help you
          optimize off-page SEO."
          image="/online-marketing.png"
        />
        <ServiceCard
          title="SEO Optimization"
          description="Get high rankings with multi-team collaboration that will help you
          optimize off-page SEO."
          image="/seo-optimization.png"
        />
        <ServiceCard
          title="Data Analysis"
          description="Get high rankings with multi-team collaboration that will help you
          optimize off-page SEO."
          image="/data-analysis.png"
        />
        <ServiceCard
          title="Lead Generation"
          description="Get high rankings with multi-team collaboration that will help you
          optimize off-page SEO."
          image="/lead-generation.png"
        />
      </div>
    </div>
  );
};
