import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { ReactNode, useState } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

const useStyles = makeStyles(() => ({
  arrowIcon: {
    marginRight: "0.5rem",
    position: "relative",
    top: "0.1em",
  },
}));
type Props = {
  title: string;
  children: ReactNode;
};

export function Expandable({ children, title }: Props): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  }
  const classes = useStyles();
  return (
    <>
      <a href="#" onClick={toggle}>
        {!isExpanded && <FiArrowRight className={classes.arrowIcon} />}
        {isExpanded && <FiArrowDown className={classes.arrowIcon} />}

        {title}
      </a>
      {isExpanded && children}
    </>
  );
}

export default Expandable;
