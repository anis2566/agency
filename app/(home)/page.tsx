import { Metadata } from "next";

import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Pricing } from "./_components/pricing";
import { Testimonials } from "./_components/testimonials";
import { Newslettr } from "./_components/newsletter";
import { WhyChooseUs } from "./_components/why-choose-us";
import { Team } from "./_components/team";

export const metadata: Metadata = {
  title: "Agency",
  description: "Agency",
};

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <Team />
      <Newslettr />
    </div>
  );
};

export default Home;
