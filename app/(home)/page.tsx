import { Metadata } from "next";

import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Pricing } from "./_components/pricing";
import { Testimonials } from "./_components/testimonials";
import { Newslettr } from "./_components/newsletter";
import { WhyChooseUs } from "./_components/why-choose-us";
import { Team } from "./_components/team";
import { db } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Agency",
  description: "Agency",
};

const Home = async () => {
  const [services, reviews] = await Promise.all([
    db.service.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true
      }
    }),
    db.review.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true
      }
    })
  ])

  return (
    <div>
      <Hero />
      <Services services={services} />
      <WhyChooseUs />
      <Testimonials reviews={reviews} />
      <Pricing />
      <Team />
      <Newslettr />
    </div>
  );
};

export default Home;
