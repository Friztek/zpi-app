
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
        links={[]}
      />
    </Layout>
  );
};
export default Home;
