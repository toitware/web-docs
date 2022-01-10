import { Link } from "@mui/material";
import { Link as GatsbyLink } from "gatsby";
import * as React from "react";
import { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function DocsLink(props: Props): JSX.Element {
  const { href, children, className } = props;

  if (!href) {
    return <span className={className}>{children}</span>;
  }

  if (href.startsWith("http")) {
    return (
      <Link
        className={className}
        underline="hover"
        target="_blank"
        rel="noreferrer"
        variant="body1"
        color="textSecondary"
        {...props}
      />
    );
  } else {
    return (
      <GatsbyLink className={className} to={href} {...props}>
        {children}
      </GatsbyLink>
    );
  }
}

export default DocsLink;
