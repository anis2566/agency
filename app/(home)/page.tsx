import { Metadata } from "next";

import { Hero } from "./_components/hero";

export const metadata: Metadata = {
  title: "Agency",
  description: "Agency",
};


const Home = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default Home
