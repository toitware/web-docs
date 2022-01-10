import { styled, css } from "@mui/material/styles";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import { IoInformationCircle, IoWarning } from "react-icons/io5";

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "visible",
})<{ type?: "info" | "warning" }>(({ theme, type }) => {
  let borderColorLeft: string;

  switch (type) {
    case "info":
      borderColorLeft = theme.palette.primary.main;
      break;
    case "warning":
      borderColorLeft = theme.palette.warning.main;
      break;
    default:
      borderColorLeft = theme.palette.text.primary;
      break;
  }

  return {
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    padding: "0 1.5rem 0 1.5rem",
    borderRadius: "4px",
    borderLeft: `3px solid ${borderColorLeft}`,
    margin: "3rem 0",
  };
});

const Title = styled("div")({
  marginTop: "1rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
});
const Body = styled("div")({
  display: "flex",
  alignItems: "center",
});
const BodyContent = styled("div")({
  // By setting a very small width, and then flex: 1, we allow the content
  // to grow, without extending over the container.
  width: "10%",
  flex: "1",
});

const iconCss = css({
  flexShrink: 0,
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "1rem",
});
const InfoIcon = styled(IoInformationCircle)`
  ${iconCss}
  color: ${({ theme }) => theme.palette.primary.main};
`;
const WarningIcon = styled(IoWarning)`
  ${iconCss}
  color: ${({ theme }) => theme.palette.warning.main};
`;

type Props = {
  children: ReactNode;
  title: string;
  type?: "info" | "warning";
};

export function Note({ children, title, type = "info" }: Props): JSX.Element {
  return (
    <Wrapper type={type}>
      {title && (
        <Title>
          {type == "info" && <InfoIcon />}
          {type == "warning" && <WarningIcon />}
          {title}
        </Title>
      )}
      <Body>
        {!title && type == "info" && <InfoIcon />}
        {!title && type == "warning" && <WarningIcon />}
        <BodyContent>{children}</BodyContent>
      </Body>
    </Wrapper>
  );
}

export default Note;
