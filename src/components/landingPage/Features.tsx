import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { IconAlarm, IconBed, IconChartBar } from "@tabler/icons";

const mockdata = [
  {
    title: "Extreme convenient",
    description:
      "This application offers you the functionalities that you need to track your money. It saves your time searching current exchange rates and updating the valuesof each asset.",
    icon: IconBed,
  },
  {
    title: "Reports functionality",
    description:
      "You can get weekly reports on your email to see how your wallet value changed. You can also see charts of your total wallet value changed in time and check the history of changes of your asset values.",
    icon: IconChartBar,
  },
  {
    title: "Alerts functionality",
    description:
      "You can set the alert for asset values and get them on your email or in mobile application.",
    icon: IconAlarm,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function Features() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg" py="xl" pt={60}>
      <Group position="center">
        <Badge variant="filled" size="lg">
          Best asset tracker ever
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Track your money effortlessly with us
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Your assets value are updated automatically based on current exchange
        rates. You can see how it changed on generated chart.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
