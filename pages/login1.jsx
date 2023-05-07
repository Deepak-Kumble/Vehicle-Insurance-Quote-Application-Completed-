import {
  Button,
  Grid,
  Stack,
  createStyles,
  Center,
  Paper,
  TextInput,
  Modal,
  Text,
  Col,
  Tooltip,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Router from "next/router";
import { NavBar } from "../components/NavBar";
import { API_URL } from "../constants";
import { FooterLinks } from "../components/FooterLinks";
import { Banner } from "../components/Banner";
import { GetUserCurrentCounter } from "../components/data/UserQuoteStateSimulator";
import Link from "next/link";
import { Login } from "../components/Login";
import { NavAccount } from "../components/NavAccount";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    backgroundImage: "url(https://iiflinsurance.com/images/2020/07/44-01.jpg)",
    backgroundSize: "cover",
  },

  // form: {
  //   borderRight: `${rem(1)} solid ${
  //     theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
  //   }`,
  //   minHeight: rem(900),
  //   maxWidth: rem(450),
  //   paddingTop: rem(80),

  //   [theme.fn.smallerThan("sm")]: {
  //     maxWidth: "100%",
  //   },
  // },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Page() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
  });

  const handleFormSubmit = (values) => {
    // let x = GetUserCurrentCounter(values.username);
    let obj = {
      user_name: values.username,
      // ...x?.quote1,
      // ...x?.quote2,
      // ...x?.quote3,
      // ...x?.quote4,
    };
    localStorage.setItem("quote", JSON.stringify(obj));
    Router.push("/quote1");
  };

  // ah wait... My laptop wont identify mic...need to restart, 2mins
  //ok

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavBar />
      <></>
      <div className={classes.wrapper}>
        <Paper
          radius="md"
          p="xl"
          withBorder
          shadow={"lg"}
          style={{
            position: "absolute",
            left: "10%",
            background: "hsla(0, 0%, 90%, 0.6)",
            borderRadius: "6px",
            boxShadow: "0 5px 30px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid hsla(0, 0%, 100%, 0.6)",
          }}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Auto Armor!
          </Title>

          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <Stack spacing="xs">
              <TextInput
                type="text"
                label="Username:"
                size="md"
                placeholder="Enter your Username"
                required
                {...form.getInputProps("username")}
              />

              <TextInput
                type="password"
                label="Password:"
                size="md"
                placeholder="Enter your Password"
                required
                {...form.getInputProps("password")}
              />

              <Button type="submit" radius="xs">
                Login
              </Button>
              <Link href="/quote" className={classes.link} style={{ textDecoration: "none" }}>
                <Text size="sm" ta="center" mt="md" color="black" underline>
                  Don't have an account? Register now!
                </Text>
              </Link>
            </Stack>
          </form>
        </Paper>
      </div>
      <FooterLinks />
    </>
  );
}
