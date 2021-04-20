import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import Color from "color";
import * as React from "react";
import { ReactElement, ReactNode, useState } from "react";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    borderRadius: "3px",
  },
  tabs: {
    display: "flex",
    borderBottom: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
  },
  tab: {
    padding: "0.75rem 0",
    margin: "0 1rem",
    display: "block",
    borderBottom: `3px solid transparent`,
  },
  tabActive: {
    fontWeight: "bold",
    borderColor: theme.palette.primary.main,
  },
  content: {
    padding: "1rem",
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
