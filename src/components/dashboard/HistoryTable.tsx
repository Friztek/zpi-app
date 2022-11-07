import { useState } from "react";
import { createStyles, Table, ScrollArea, Card } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: "1rem 3rem !important",
    [theme.fn.smallerThan("md")]: {
      padding: 0
    }
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface HistoryTableProps {
  data: { name: string; value: number; date: string }[];
}

export const HistoryTable = ({ data }:  HistoryTableProps) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.value}</td>
      <td>{row.date}</td>
    </tr>
  ));

  return (
    <Card className={classes.card}>
      <ScrollArea
        sx={{ height: 500 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 400 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th style={{ width: "20%" }}>Asset Name</th>
              <th style={{ width: "50%" }}>Value</th>
              <th style={{ width: "30%" }}>Date</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
