import { Link } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import * as React from "react";
import { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
};

export function DocsLink(props: Props): JSX.Element {
  const { href, children } = props;

  if (!href) {
    return <span>{children}</span>;
  }

  if (href.startsWith("http")) {
    return <Link target="_blank" rel="noreferrer" variant="body1" color="textSecondary" {...props} />;
  } else {
    return (
      <GatsbyLink to={href} {...props}>
        {children}
      </GatsbyLink>
    );
  }
}

export default DocsLink;
