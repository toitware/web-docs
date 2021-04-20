import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import Color from "color";
import * as React from "react";
import { ReactElement, ReactNode, useState } from "react";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "3px",
    margin: "3rem 0",
  },
  tabs: {
    display: "flex",
  },
  tab: {
    position: "relative",
    top: "1px",
    padding: "0.75rem 1.5rem",
    display: "block",
    color: theme.palette.text.primary,
    border: "1px solid transparent",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    fontSize: "0.875rem",
  },
  tabActive: {
    borderColor: Color(theme.palette.text.primary).alpha(0.2).string(),
    borderBottomColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  content: {
    padding: "1.5rem 2.5rem",
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    borderRadius: "5px",
    borderTopLeftRadius: 0,
  },
}));

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab({ label, isActive, onClick }: TabProps): JSX.Element {
  const classes = useStyles();
  return (
    <Typography key={label} component="span">
      <a
        className={clsx(classes.tab, { [classes.tabActive]: isActive })}
        href="javascript:undefined;"
        onClick={onClick}
      >
        {label}
      </a>
    </Typography>
  );
}

type TabsProps = {
  children: ReactElement<DivProps>[];
};

type DivProps = {
  label?: string;
  children: ReactNode;
};

/**
 * Component to display a block with tabs.
 *
 * Usage:
 *
 *     <Tabs>
 *     <div label="Tab 1">
 *
 *     Content for tab 1
 *
 *     </div>
 *     <div label="Tab 2">
 *
 *     Content for tab 2
 *
 *     </div>
 *     </Tabs>
 */
export function Tabs({ children }: TabsProps): JSX.Element {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className={classes.root}>
      <nav className={classes.tabs}>
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              key={label}
              label={label || "Unnamed Tab"}
              isActive={label == activeTab}
              onClick={() => setActiveTab(label)}
            />
          );
        })}
      </nav>

      {children.map((child) => {
        const { label, children } = child.props;
        if (label != activeTab) return undefined;
        return (
          <div className={classes.content} key={label}>
            {children}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
