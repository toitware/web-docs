import { styled } from "@mui/system";
import * as React from "react";
import { ReactNode, useState } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

const arrowStyle = `
  margin-right: 0.5rem;
  position: relative;
  top: 0.1em;
`;

const ArrowRight = styled(FiArrowRight)(arrowStyle);
const ArrowDown = styled(FiArrowDown)(arrowStyle);

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
  return (
    <>
      <a href="#" onClick={toggle}>
        {!isExpanded && <ArrowRight />}
        {isExpanded && <ArrowDown />}

        {title}
      </a>
      {isExpanded && children}
    </>
  );
}

export default Expandable;
