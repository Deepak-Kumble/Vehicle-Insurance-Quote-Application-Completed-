import {
  Button,
  Center,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Stepper,
  Grid,
  Col,
  Tooltip,
  Modal,
  Divider,
} from "@mantine/core";
import Link from "next/link";
import { Radio } from "@mantine/core";
import { NavBar } from "../components/NavBar";
import { Progress } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { API_URL } from "../constants";
import Router from "next/router";
import { FooterLinks } from "../components/FooterLinks";
import { QuoteHeader } from "../components/QuoteHeader";
import { NavAccount } from "../components/NavAccount";
import { GetUserQuoteState, lol } from "../components/data/UserQuoteStateSimulator";
import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";

export default function Page() {
  let initVals = {
    renewal_type: "",
    cover_type: new Date(),
  };
  const form = useForm({
    initialValues: initVals,
  });

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("quote"))["user_name"];
    let y = GetUserQuoteState(x, "quote3");
    y = y ? new Date(y) : new Date();
    form.setValues(y ?? initVals);
  }, []);

  const handleBackButtonClick = () => {
    const queryParams = new URLSearchParams(form.values).toString();
    Router.push(`/quote2?${queryParams}`);
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
        active={3}
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
          <Paper w="100%" h="100%" shadow="lg" radius="xs" p="lg">
            <form
              onSubmit={form.onSubmit((v) => {
                let data = new FormData();
                for (const prop in v) {
                  data.append(prop, v[prop]);
                }

                lol(JSON.parse(localStorage.getItem("quote"))["user_name"], "quote3", v, 3);

                fetch(API_URL + "other", {
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

                      let searchparams = new URLSearchParams(x);

                      fetch(API_URL + "generatequote?" + searchparams.toString(), {
                        method: "POST",
                      })
                        .then((res) => res.text())
                        .then((res) => {
                          console.log(res);

                          localStorage.setItem("quote_value", res);
                          Router.push("/quote4");
                        });
                    } else {
                      alert("An error occurred while saving insurance details.");
                    }
                  })
                  .catch((error) => {
                    alert("An error occurred while saving insurance details.");
                    console.error(error);
                  });
              })}>
              <Stack spacing={"xs"}>
                <QuoteHeader name="Insurance Details" step={3} />

                <Radio.Group
                  {...form.getInputProps("renewal_type")}
                  label="Insurance Renewal Type:"
                  size="md"
                  required>
                  <Group>
                    <Radio label="Upgrade" value="Upgrade" />
                    <Radio label="Existing" value="Existing" />
                  </Group>
                </Radio.Group>

                <Text align size="sm" color="dimmed">
                  <b>Upgrade:</b> Upgrade Your Insurance Policy for Enhanced Protection. Enhance your coverage
                  with our upgrade option Tailor your insurance policy to meet your changing needs Expand your
                  coverage limits and benefits for comprehensive protection Stay ahead of risks by upgrading
                  your insurance policy Upgrade today for greater peace of mind <br />
                  <br />
                  <b>Existing:</b>Renew Your Existing Insurance Policy with Ease. Seamless renewal process for
                  your current insurance policy. Maintain your current level of coverage and benefits Continue
                  enjoying the protection you trust Hassle-free renewal with no changes to your policy Stay
                  protected with a simple and convenient renewal of your existing policy
                </Text>

                <DateInput
                  id="cover_type"
                  name="cover_type"
                  label="Insurance Covering Date:"
                  size="md"
                  required
                  {...form.getInputProps("cover_type")}
                />

                <div class="checkbox-container">
                  <input type="checkbox" id="terms-conditions" name="terms-conditions" size="md" required />
                  <label for="terms-conditions">
                    I agree that all the information provided is true to my knowledge. Terms and Conditions
                    apply.
                  </label>
                </div>
                <Group position="right">
                  <Link href="/quote2" style={{ textDecoration: "none" }}>
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
