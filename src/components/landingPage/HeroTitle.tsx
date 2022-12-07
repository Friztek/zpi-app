import { useAuth0 } from "@auth0/auth0-react";
import { Title, Text, Container, Button, Overlay, createStyles } from "@mantine/core";
import { useUrl } from "../../hooks/useUrl";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    height: "100vh",
    alignItems: "center",
    backgroundImage:
      "url(https://img.freepik.com/free-photo/stack-money-coin-with-trading-graph_1150-17752.jpg?w=1480&t=st=1666111471~exp=1666112071~hmac=101a7dbe71d760d9860ea6376c75976d0f0b3f5fe9eb86e2af301c9c0ee82163)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  inner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export function HeroTitle() {
  const { classes } = useStyles();
  const { loginWithRedirect } = useAuth0();
  const url = useUrl();
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Asset tracker that{" "}
          <Text component="span" inherit className={classes.highlight}>
            your need
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description} sx={{ marginBottom: 5 }}>
            Track your wallet total value in prefered currency. All calculated by current exchange rates. Just add your
            assets and see how your wallet value changes.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            onClick={() => loginWithRedirect({ redirectUri: `${url}dashboard` })}
            className={classes.control}
            variant="white"
            size="lg"
          >
            Sign in and get started
          </Button>
        </div>
      </div>
    </div>
  );
}
