import { makeStyles } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "46rem",
    maxWidth: "100%",
    padding: theme.spacing(4),

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
    },

    // Setting the basic typography so things like list bullets are colored properly
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,

    "& a": {
      color: theme.palette.primary.main,
      "&:hover": {
        textDecoration: "underline",
      },
    },

    "& p": {
      marginTop: "0.75rem",
    },
    "& h1": {
      margin: "1.5rem 0",

      // A bit of a dirty hack to make the anchor links work
      marginTop: "-4.5rem",
      paddingTop: "6rem",
      "&:first-child": {
        paddingTop: "4.5rem",
      },
    },
    "& h2": {
      margin: "1.5rem 0",

      // A bit of a dirty hack to make the anchor links work
      marginTop: "-4.5rem",
      paddingTop: "6rem",
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
  },
}));

export const Body: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Body;
