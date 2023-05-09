import { createStyles, Container, Text, Button, Group, rem } from "@mantine/core";
import { Center } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import Link from "next/link";
import Router from "next/router";
import { DeleteUserState } from "./data/UserQuoteStateSimulator";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    //linear gradient background color
    background: "linear-gradient(180deg, rgb(34, 139, 230) 0%, #fff 100%)",
  },

  inner: {
    position: "relative",
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: theme.fontSizes.lg,
    color: "black",

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan("sm")]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

export function HeroSection3() {
  const { classes } = useStyles();

  const StupidQuoteRedirect = () => {
    localStorage.setItem(
      "quote",
      JSON.stringify({
        user_name: "demo1user",
      })
    );

    DeleteUserState("demo1user");

    Router.push("/quote1");
  };

  return (
    <div className={classes.wrapper}>
      <Container size={2000} className={classes.inner}>
        <Center>
        <h1 className={classes.title}>
          Thank You{" "}
          <Text component="span" variant="gradient" gradient={{ from: "black", to: "black" }} inherit>
            for using Auto Armor
          </Text>{" "}
        </h1>
        </Center>
        <br/>
        <Center>
            <strong>
        <Text size="xl" color="#cc0000">
          Payment has been successful. Click below to go home.
        </Text></strong>
        </Center>
        <Center maw={400} h={100} mx="auto">
          <Group className={classes.controls}>
          <Link href="/">
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}>
              Home
            </Button>
            </Link>
          </Group>
        </Center>
      </Container>
    </div>
  );
}
