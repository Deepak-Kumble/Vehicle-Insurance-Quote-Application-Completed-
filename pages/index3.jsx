import { FooterLinks } from "../components/FooterLinks";
import { NavBar } from "../components/NavBar";
import { Button, Stack } from "@mantine/core";
import { HeroSection3 } from "../components/HeroSection3";
import { Features } from "../components/Features";
import { MantineProvider } from "@mantine/core";

export default function Page() {
  return (
    <Stack spacing={0}>
      <NavBar />
      <HeroSection3 />
      <Features />
      <FooterLinks />
    </Stack>
  );
}
