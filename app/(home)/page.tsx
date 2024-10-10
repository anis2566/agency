import { Metadata } from "next";

import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Pricing } from "./_components/pricing";

export const metadata: Metadata = {
  title: "Agency",
  description: "Agency",
};

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Pricing />
    </div>
  );
};

export default Home;
