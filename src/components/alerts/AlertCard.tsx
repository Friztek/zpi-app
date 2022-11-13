import { createStyles, Text, Button, Card, Space } from "@mantine/core";
import { IconX } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundPosition: "center",
  },
  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 800,
    color: theme.white,
    lineHeight: 1.3,
    fontSize: 27,
  },

  currentValue: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface AlertCardImageProps {
  assetShortcutFrom: string;
  assetShortcutTo: string;
  value: number;
  currentValue: number;
  gradient: string;
}

export const AlertCard = ({
  assetShortcutFrom,
  assetShortcutTo,
  value,
  currentValue,
  gradient,
}: AlertCardImageProps) => {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      style={{
        height: 110,
        width: "100%",
        backgroundImage: gradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text className={classes.title} size="lg">
          {"1 " + assetShortcutFrom + " = " + value + " " + assetShortcutTo}
        </Text>
        <Button style={{ alignSelf: "flex-end", backgroundColor: "rgb(64 123 139)" }}>
          <IconX stroke="3" size={19} />
        </Button>
      </div>
      <Space h="xs"></Space>
      <Text className={classes.currentValue} size="xs">
        {"Current value: " + currentValue}
      </Text>
    </Card>
  );
};
