import { createStyles, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  bgGradient: {
    background:
      "linear-gradient(0deg, rgba(35,164,166,1) 0%, rgba(13,18,88,1) 100%)",
    width: "100%",
    zIndex: 1,
    height: "70%",
    position: "absolute",
    borderRadius: "md",
    margin: 10,
  },
}));

export const ProfileTitle = ({ text }: { text: string }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.bgGradient}>
      <Title
        align="center"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        style={{ marginTop: 10 }}
        order={1}
      >
        {text}
      </Title>
    </div>
  );
};
