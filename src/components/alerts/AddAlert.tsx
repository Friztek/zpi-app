import {
  Button,
  createStyles,
  Center,
  Text,
  Space,
  Paper,
  NumberInput,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { forwardRef } from "react";
import { SelectAsset } from "./SelectAsset";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]}`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

export const AddAlert = () => {
  
  const { classes, theme } = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Button
      variant="outline"
      onClick={() => {
        openModal({
          title: "Add new alert",
          size: "60%",
          fullScreen: isMobile,
          closeButtonLabel: "Close add alert modal",
          children: (
            <div>
              <Paper
                withBorder
                radius="md"
                style={{
                  height: 110,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  direction="row"
                  justify="center"
                  align="center"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: `Greycliff CF ${theme.fontFamily}`,
                      fontWeight: 600,
                      color: theme.white,
                      lineHeight: 1.3,
                      fontSize: 20,
                    }}
                    size="lg"
                  >
                    1
                  </Text>
                  <Space w="sm"></Space>
                  <SelectAsset />
                  <Space w="md"></Space>
                  <Text
                    style={{
                      fontFamily: `Greycliff CF ${theme.fontFamily}`,
                      fontWeight: 600,
                      color: theme.white,
                      lineHeight: 1.3,
                      fontSize: 20,
                    }}
                    size="lg"
                  >
                    =
                  </Text>
                  <Space w="md"></Space>
                  <NumberInput
                    hideControls
                    precision={8}
                    styles={{
                      input: {
                        width: 300,
                        textAlign: "center",
                        fontFamily: `Greycliff CF ${theme.fontFamily}`,
                        fontWeight: 600,
                        color: theme.white,
                        lineHeight: 1.3,
                        fontSize: 20,
                      },
                    }}
                    rightSection={<SelectAsset />}
                    rightSectionWidth={150}
                  />
                </Flex>
              </Paper>
              <Center>
                <Button onClick={() => closeAllModals} mt="md">
                  Submit
                </Button>
              </Center>
            </div>
          ),
        });
      }}
    >
      Add alert
    </Button>
  );
};
