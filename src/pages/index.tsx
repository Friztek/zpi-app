import type { NextPage } from "next";
import { Features } from "../components/landingPage/Features";
import { Footer } from "../components/landingPage/Footer";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { Layout } from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <HeroTitle />
      <Features />
      <Footer
        links={[
          { label: "Test", link: "" },
          { label: "Github", link: "" },
        ]}
      />
    </Layout>
  );
};
export default Home;
