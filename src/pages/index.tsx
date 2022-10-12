import type { NextPage } from "next";
import { Features } from "../components/landingPage/Features";
import { Footer } from "../components/landingPage/Footer";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { Topbar } from "../components/landingPage/Topbar";

const Home: NextPage = () => {
  return (
    <div>
      <Topbar />
      <HeroTitle />
      <Features />
      <Footer
        links={[
          { label: "Test", link: "" },
          { label: "Github", link: "" },
        ]}
      />
    </div>
  );
};
export default Home;
