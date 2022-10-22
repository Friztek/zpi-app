import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Features } from "../components/landingPage/Features";
import { Footer } from "../components/landingPage/Footer";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { Layout } from "../components/layout/Layout";

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user !== undefined) {
    router.push("/dashboard");
    return null;
  }

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
