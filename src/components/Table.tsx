import { Paper, Table as MUITable, TableCell, TableContainer } from "@mui/material";
import React from "react";

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
  return (
    <TableCell sx={{ fontWeight: 700 }} variant="head">
      {children}
    </TableCell>
  );
}

export function TableBody({ children }: TableProps): JSX.Element {
  return <TableCell variant="body">{children}</TableCell>;
}
