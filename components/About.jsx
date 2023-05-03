import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Center,
} from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
  IconRegistered,
  IconLogin,
  IconHelp,
  IconCarCrash,
  IconReportMoney,
} from '@tabler/icons-react';

const mockdata = [
  { title: 'Personalized Insurance Quote', icon: IconCarCrash, color: 'violet' },
  { title: 'Compare Quotes', icon: IconCoin, color: 'teal' },
  { title: 'Cutomer Support', icon: IconHelp, color: 'green' },

  { title: 'Payment', icon: IconCreditCard, color: 'cyan' },
 
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}));

export function About() {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="center">
          <Center>
        <Text align="center"  className={classes.title}>SERVICES</Text>
        </Center>
     
      </Group>
      <SimpleGrid cols={4} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}