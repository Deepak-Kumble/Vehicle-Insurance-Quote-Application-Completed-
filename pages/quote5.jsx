import {
  Button,
  NumberInput,
  Select,
  Paper,
  TextInput,
  Center,
  Stack,
  Grid,
  Title,
  Text,
  Group,
  Stepper,
  Card,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import { API_URL } from "../constants";
import { useForm } from "@mantine/form";
import Link from "next/link";
import Router from "next/router";
import { FooterLinks } from "../components/FooterLinks";
import { Banner } from "../components/Banner";
import { NavAccount } from "../components/NavAccount";
import { QuoteHeader } from "../components/QuoteHeader";
import { useLocalStorage } from "@mantine/hooks";
import { ADDONS } from "../components/data/addon";

// TODO
export default function Page() {
  // const [quote, setQuote] = useState(0);
  // const [tax, setTax] = useState(0);
  // const [addOnsTotal, setAddOnsTotal] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);
  const [quoteAmont] = useLocalStorage({
    key: "quote_value",
    defaultValue: -1,
  });
  const [addOnIndexes] = useLocalStorage({
    key: "quote_addons",
    defaultValue: null,
  });
  const [quoteVals] = useLocalStorage({
    key: "quote",
    defaultValue: null,
    deserialize: (v) => JSON.parse(v),
  });

  const form = useForm({
    initialValues: {
      cardno: 0,
      cvv: "",
      bankname: "",
      amount: 0,
    },
  });

  let quote = parseFloat(quoteAmont);
  let addOnsTotal = addOnIndexes?.split(",").reduce((total, v) => total + ADDONS.at(parseInt(v)).price, 0);
  const tax = 50; // Assuming tax is 10% of the quote
  const grandTotal = quote + tax + addOnsTotal;

  const handleFormSubmit = (values) => {
    // Save form data to localStorage
    localStorage.setItem("paymentDetails", JSON.stringify(values));

    const formData = new FormData();
    for (const prop in values) {
      formData.append(prop, values[prop]);
    }

    fetch(API_URL + "payment", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          Router.push("/");
          localStorage.removeItem("quote");
          const paymentSuccessDiv = document.createElement("div");
          paymentSuccessDiv.textContent = "Payment has been successfully completed";
          paymentSuccessDiv.style.textAlign = "center";
          paymentSuccessDiv.style.color = "red";
          paymentSuccessDiv.style.fontWeight = "bold";
          document.getElementById("payment-form").appendChild(paymentSuccessDiv);
        } else {
          alert("An error occurred while processing the payment.");
        }
      })
      .catch((error) => {
        alert("An error occurred while processing the payment.");
        console.error(error);
      });
  };

  return (
    <>
      <NavAccount />
      <br />
      <Banner />
      <br />
      <Stack spacing={10} p={20}>
        <Stepper
          active={5}
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

        <Grid>
          <Grid.Col span={6}>
            <Paper w={"100%"} h={"100%"} shadow="lg" radius="xs" p="lg">
              <Text align="center" size="lg">
                <b>Please verify all the following details</b>
              </Text>
              <Text align="center" size="xs" color="dimmed">
                Wrong data may lead to incorrect quotes
              </Text>
              <br />
              <Group position="apart">
                <Text>Your Username:</Text>
                <Text>{quoteVals?.user_name}</Text>
              </Group>
              <Group position="apart">
                <Text>The registration number of your vehicle:</Text>
                <Text>{quoteVals?.regis}</Text>
              </Group>
              <Group position="apart">
                <Text>Vehicle Maker:</Text>
                <Text>{quoteVals?.make}</Text>
              </Group>
              <Group position="apart">
                <Text>Vehicle Model:</Text>
                <Text>{quoteVals?.model}</Text>
              </Group>
              <Group position="apart">
                <Text>Vehicle Transmission type:</Text>
                <Text>{quoteVals?.gearbox}</Text>
              </Group>
              <Group position="apart">
                <Text>Vehicle Fuel type:</Text>
                <Text>{quoteVals?.fuel}</Text>
              </Group>
              <Group position="apart">
                <Text>Type of Driving license:</Text>
                <Text>{quoteVals?.todl}</Text>
              </Group>
              <Group position="apart">
                <Text>Driving Experience:</Text>
                <Text>{quoteVals?.drive}</Text>
              </Group>
              <Group position="apart">
                <Text>Previous Traffics violations:</Text>
                <Text>{quoteVals?.trafs}</Text>
              </Group>

              <Title align="center" order={4}>
                Add Ons
              </Title>
              {addOnIndexes?.split(",").map((v) => {
                let x = ADDONS.at(parseInt(v));
                return (
                  <Group position="apart">
                    <Text>{x.name}:</Text>
                    <Text>£{x.price}</Text>
                  </Group>
                );
              })}
              <Group position="center">
                <Button type="submit" radius="xl">
                  <Link href={"/quote1"} style={{ textDecoration: "none", color: "white" }}>
                    Modify
                  </Link>
                </Button>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper shadow="lg" w={"100%"} h={"100%"} radius="xs" p="lg">
              <form id="payment-form" onSubmit={form.onSubmit(handleFormSubmit)}>
                <Stack spacing={"md"} mx={30}>
                  <QuoteHeader name="Payment" step={5} />

                  <Text align="center" size="xs" color="dimmed">
                    Please provide your card details
                  </Text>

                  <Grid>
                    <Grid.Col span={9}>
                      <NumberInput
                        label="Card Number:"
                        id="card-number"
                        name="cardno"
                        class="form-control"
                        placeholder="Enter Card Number"
                        {...form.getInputProps("cardno")}
                      />
                    </Grid.Col>

                    <Grid.Col span={3}>
                      <NumberInput
                        type="password"
                        label="CVV:"
                        placeholder="Enter CVV"
                        {...form.getInputProps("cvv")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Center>
                    <Card withBorder w={400}>
                      <Stack spacing={30}>
                        <Group position="apart">
                          <Text>Generated Quote Amount:</Text>
                          <Text>
                            <b>£{quote}</b>
                          </Text>
                        </Group>
                        <Group position="apart">
                          <Text>Tax Amount:</Text>
                          <Text>
                            <b>£{tax}</b>
                          </Text>
                        </Group>
                        <Group position="apart">
                          <Text>Add-ons Amount:</Text>
                          <Text>
                            <b>£{addOnsTotal}</b>
                          </Text>
                        </Group>
                        <Divider />
                        <Group position="apart">
                          <Text>Grand Total:</Text>
                          <Text>
                            <b>£{grandTotal}</b>
                          </Text>
                        </Group>
                      </Stack>
                    </Card>
                  </Center>

                  <Group position="center">
                    <Button type="submit" radius="xl">
                      Pay
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>

      <FooterLinks />
    </>
  );
}
