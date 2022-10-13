import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Features } from "../components/landingPage/Features";
import { Footer } from "../components/landingPage/Footer";
import { HeroTitle } from "../components/landingPage/HeroTitle";
import { Topbar } from "../components/landingPage/Topbar";

const Home: NextPage = () => {
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
