import {
  Button,
  NumberInput,
  Paper,
  Select,
  Textarea,
  TextInput,
  Center,
  Stack,
  Text,
  Group,
  Title,
  Grid,
  Col,
  Tooltip,
  Stepper,
  Modal,
  Divider,
} from "@mantine/core";
import Link from "next/link";
import { NavAccount } from "../components/NavAccount";
import { Banner } from "../components/Banner";
import { DateInput } from "@mantine/dates";
import { Progress } from "@mantine/core";
import { useForm } from "@mantine/form";
import Router from "next/router";
import { CAR_MODELS } from "../components/data/CarModelMakers";
import { API_URL } from "../constants";
import { NavBar } from "../components/NavBar";
import { FooterLinks } from "../components/FooterLinks";
import { QuoteHeader } from "../components/QuoteHeader";
import { GetUserQuoteState, lol } from "../components/data/UserQuoteStateSimulator";
import { useEffect, useState } from "react";

export default function Page() {
  let initVals = {
    todl: "",
    drive: 0,
    trafs: 0,
    claims: 0,
  };
  const form = useForm({
    initialValues: initVals,
  });

  useEffect(() => {
    form.setValues(
      GetUserQuoteState(JSON.parse(localStorage.getItem("quote"))["user_name"], "quote2") ?? initVals
    );
  }, []);

  const handleBackButtonClick = () => {
    const queryParams = new URLSearchParams(form.values).toString();
    Router.push(`/quote1?${queryParams}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavAccount />
      <br />
      <Banner />
      <br />
      <Stepper
        active={1}
        onStepClick={() => {}}
        orientation="horizontal"
        style={{ margin: "10px", padding: "10px" }}>
        <Stepper.Step label="Step 1" description="Vehicle Details" />
        <Stepper.Step label="Step 2" description="Driving Details" />
        <Stepper.Step label="Step 3" description="Insurance Details" />
        <Stepper.Step label="Step 4" description="Generated Policy & Add-ons" />
        <Stepper.Step label="Step 5" description="Payment" />
      </Stepper>
      <Divider my={10} />
      <br />
      <Grid gutter="xl">
        <Col span={9}>
          <Paper w="100%" h="100%" shadow="lg" radius="xs" p="xl">
            <form
              onSubmit={form.onSubmit((v) => {
                let data = new FormData();
                for (const prop in v) {
                  data.append(prop, v[prop]);
                }

                lol(JSON.parse(localStorage.getItem("quote"))["user_name"], "quote2", v, 2);

                fetch(API_URL + "ess", {
                  method: "POST",
                  body: data,
                })
                  .then((response) => {
                    if (response.ok) {
                      let quoteData = JSON.parse(localStorage.getItem("quote"));
                      let x = {
                        ...quoteData,
                        ...v,
                      };
                      localStorage.setItem("quote", JSON.stringify(x));
                      Router.push("/quote3");
                    } else {
                      alert("An error occurred while saving driving details.");
                    }
                  })
                  .catch((error) => {
                    alert("An error occurred while saving driving details.");
                    console.error(error);
                  });
              })}>
              <Stack spacing={"xs"}>
                <QuoteHeader name={"Driving Details"} step={2} />

                <Select
                  label="Type of Driving License:"
                  required
                  placeholder="Select Type of Driving License:"
                  id="todl"
                  name="todl"
                  size="md"
                  data={["Full", "Provisional"]}
                  {...form.getInputProps("todl")}
                />

                <NumberInput
                  label="Driving Experience (years):"
                  id="drive"
                  name="drive"
                  min="0"
                  size="md"
                  {...form.getInputProps("drive")}
                  required
                />

                <NumberInput
                  label="Number of Traffic Convictions:"
                  id="trafs"
                  name="trafs"
                  min="0"
                  size="md"
                  {...form.getInputProps("trafs")}
                  required
                />

                <NumberInput
                  label="Number of Insurance Claims in Past Year:"
                  required
                  id="claims"
                  name="claims"
                  min="0"
                  size="md"
                  {...form.getInputProps("claims")}
                />

                <Group position="right">
                  <Link href="/quote1" style={{ textDecoration: "none" }}>
                    <Button variant={"subtle"} radius="xs">
                      Back
                    </Button>
                  </Link>
                  <Button type="submit" radius="xs">
                    Save & Next
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Col>

        <Col span={3}>
          <Center>
            <Paper w="100%" shadow="lg" radius="xs" p="lg">
              <Text align="center" size="lg">
                <b>Want to continue where you left off?</b>
              </Text>
              <br />
              <Center>
                <Link href="/retrieve">
                  <Button type="submit" radius="xs">
                    Retrieve your quote here
                  </Button>
                </Link>
              </Center>
              <div style={{ marginTop: "20px" }}></div>
              <Center>
                <h3>Our Offerings...</h3>
              </Center>
              <ul>
                <li>
                  <b>Competitive Rates: </b>Get the coverage you need at a price that fits your budget with
                  our competitive rates.
                </li>
                <li>
                  <b>Comprehensive Coverage:</b> Our policies provide complete protection against accidents,
                  theft, vandalism, and natural disasters.
                </li>
                <li>
                  <b>Online Policy Management:</b> Conveniently manage your policy online, from updating
                  details to making payments, all from the comfort of your home.
                </li>
                <li>
                  <b>Defaqto 5 Star Rated:</b> Our policies have been awarded the top-notch Defaqto 5 Star
                  rating for high-quality and comprehensive coverage.
                </li>
              </ul>
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <img
                  src="https://www.direct.aviva.co.uk/quote/Direct/Motor/Content/images/defaqto-car-logo-2023.png"
                  alt="Defaqto Car Logo"
                  style={{ maxWidth: "60%", maxHeight: "60%" }}
                />
                <Tooltip label="More Information" position="bottom" withArrow>
                  <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={handleInfoClick}>
                    <br />ⓘ
                  </span>
                </Tooltip>
                {isModalOpen && (
                  <Modal opened={isModalOpen} onClose={handleCloseModal}>
                    <Text>
                      <ul>
                        <li>
                          <b>Competitive Rates:</b> We offer competitive rates for vehicle insurance, ensuring
                          that you get the coverage you need at a price that fits your budget.
                        </li>

                        <li>
                          <b>Comprehensive Coverage:</b> Our insurance policies provide comprehensive coverage
                          for your vehicle, protecting you against a wide range of risks such as accidents,
                          theft, vandalism, and natural disasters.
                        </li>

                        <li>
                          <b>24/7 Claims Support:</b> We understand that accidents can happen at any time.
                          That's why we provide 24/7 claims support, allowing you to make new claims online or
                          via phone whenever you need to.
                        </li>

                        <li>
                          <b>Defaqto 5 Star Rated:</b> Our insurance policies have been awarded the Defaqto 5
                          Star rating, which signifies their high quality and comprehensive coverage. You can
                          have peace of mind knowing that you are getting top-notch protection for your
                          vehicle.
                        </li>
                      </ul>
                    </Text>
                  </Modal>
                )}
              </div>
            </Paper>
          </Center>
        </Col>
      </Grid>

      <FooterLinks />
    </>
  );
}
