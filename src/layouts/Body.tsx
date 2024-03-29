import { styled } from "@mui/material/styles";
import * as React from "react";

const Root = styled("div")(({ theme }) => ({
  width: "46rem",
  maxWidth: "100%",
  padding: theme.spacing(4),

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
  },

  "& a": {
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },

  "& p": {
    margin: "1.5rem 0",
  },
  "& h1": {
    margin: "3rem 0",
    "&:first-of-type": {
      marginTop: 0,
    },
  },
  "& h2": {
    margin: "2rem 0",
    "&:first-of-type": {
      marginTop: 0,
    },
  },
  "& h3": {
    margin: "1.5rem 0",
  },
  "& .table-of-contents-icon": {
    position: "absolute",
    left: "-1.5rem",
    opacity: 0,
  },
  "& h1:hover .table-of-contents-icon, & h2:hover .table-of-contents-icon": {
    opacity: 1,
  },
  "& img": {
    maxWidth: "100%",
  },
}));

export const Body: React.FC = ({ children }) => {
  return <Root id="content">{children}</Root>;
};

export default Body;
