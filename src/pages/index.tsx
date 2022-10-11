import type { NextPage } from "next";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { TopBar } from "../components/landingPage/TopBar";

const Home: NextPage = () => {
  return (
    <div>
      <TopBar />
      <HeroTitle />
    </div>
  );
};
export default Home;
