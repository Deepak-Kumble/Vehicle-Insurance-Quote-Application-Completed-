import { createStyles, Paper, Text, ThemeIcon, rem, Button } from "@mantine/core";
import { IconColorSwatch, IconInfoSquareRoundedFilled } from "@tabler/icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  cardContainer: {
    display: "flex",
    gap: theme.spacing.xl,
    overflowX: "auto",
  },
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.blue[6], theme.colors.blue[6]),
    },
  },
}));

export function Policy1({ quote }) {
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Text size="l" weight={500} mt="md">
        <h2>Base Policy </h2>
      </Text>
      <Text size="md" mt="sm">
        <p>
          Our Base Policy is a great choice for those who are looking for basic coverage at an affordable
          price. This policy offers the following:
        </p>
        <ul>
          <li>Liability coverage for bodily injury and property damage</li>
          <li>Collision coverage for damages to your own vehicle</li>
          <li>Comprehensive coverage for non-collision damages like theft or natural disasters</li>
        </ul>

        <p>
          <b>
            <Text size="lg">Generated Quote amount: &pound; {parseFloat(quote)}</Text>
          </b>
        </p>
        <Link href="/quote5">
          <Button radius="xl">Buy Now</Button>
        </Link>
      </Text>
    </Paper>
  );
}
