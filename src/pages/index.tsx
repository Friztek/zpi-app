import { useUser } from "@auth0/nextjs-auth0";
import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Features } from "../components/landingPage/Features";
import { Footer } from "../components/landingPage/Footer";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { Topbar } from "../components/landingPage/Topbar";

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user !== undefined) {
    router.push("/wallet");
    return null;
  }
  
  return (
    <AppShell navbar={<Topbar />} padding={0}>
      <HeroTitle />
      <Features />
      <Footer
        links={[
          { label: "Test", link: "" },
          { label: "Github", link: "" },
        ]}
      />
    </AppShell>
  );
};
export default Home;
