import { styled, Typography } from "@mui/material";
import Color from "color";
import * as React from "react";
import { ReactElement, ReactNode, useState } from "react";

const Link = styled("a", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active = false }) => ({
  position: "relative",
  top: "1px",
  padding: "0.75rem 1.5rem",
  display: "block",
  color: theme.palette.text.primary,
  border: `1px solid transparent`,
  fontSize: "0.875rem",
  height: "100%",
  ...(active && {
    borderColor: Color(theme.palette.text.primary).string(),
    borderBottomColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  }),
}));

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab({ label, isActive, onClick }: TabProps): JSX.Element {
  const clickHandler: React.MouseEventHandler = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <Typography key={label} component="span">
      <Link active={isActive} href="#" onClick={clickHandler}>
        {label}
      </Link>
    </Typography>
  );
}

type TabsProps = {
  noPadding?: boolean;
  children: ReactElement<DivProps>[];
};

type DivProps = {
  label?: string;
  children: ReactNode;
};

const Root = styled("div")({
  borderRadius: "3px",
  margin: "3rem 0",
});

const TabsNav = styled("nav")({
  display: "flex",
});

const Content = styled("div", {
  shouldForwardProp: (prop) => prop !== "noPadding",
})<{ noPadding?: boolean }>(({ theme, noPadding = false }) => ({
  padding: noPadding ? "0" : "1.5rem 2.5rem",
  border: `1px solid ${Color(theme.palette.text.primary).string()}`,
  borderTopLeftRadius: 0,
  // h1 and h2 shouldn't be used in tabs because they break the table of contents
  "& h1, & h2": {
    background: "red",
    color: "white",
  },
  "& h1::after, & h2::after": {
    content: '" -- Don\'t use h1 or h2 in tabs"',
  },
}));

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
export function Tabs({ children, noPadding = false }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <Root>
      <TabsNav>
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
      </TabsNav>

      {children.map((child) => {
        const { label, children } = child.props;
        if (label != activeTab) return undefined;
        return (
          <Content noPadding={noPadding} key={label}>
            {children}
          </Content>
        );
      })}
    </Root>
  );
}

export default Tabs;
