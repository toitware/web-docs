import { Table as MUITable, TableCell, TableContainer, Paper, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: 700,
  },
}));

type TableProps = {
  children: React.ReactNode;
};

export function Table({ children }: TableProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <MUITable>{children}</MUITable>
    </TableContainer>
  );
}

export function TableHead({ children }: TableProps): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell className={classes.tableHead} variant="head">
      {children}
    </TableCell>
  );
}

export function TableBody({ children }: TableProps): JSX.Element {
  return <TableCell variant="body">{children}</TableCell>;
}
