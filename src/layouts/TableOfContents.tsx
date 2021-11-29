import { styled } from "@mui/material";
import { Link } from "gatsby";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";

export type TableOfContents = {
  items: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
};

const Wrapper = styled("nav")(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(18),
  maxHeight: `calc(100vh - ${theme.spacing(22)}px)`,
  alignSelf: "flex-start",
  width: "15rem",
  borderLeft: `1px solid ${theme.palette.text.primary}`,
  paddingLeft: "1.5rem",
  paddingRight: "1rem",
  overflowY: "auto",
  "& ul": {
    listStyle: "none",
    padding: 0,
    margin: "-1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  margin: "1.5rem 0",
  display: "block",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

type Props = {
  className?: string;
  table: TableOfContents;
};

type ContentsEntry = {
  title: string;
  url: string;
  level: number;
};

// The limit until headers aren't shown anymore. (4 means h4 is the last header
// to be included).
const maxHeaderLevel = 4;

// h1...h-maxHeaderLevel
const includedHeaders = [...Array(maxHeaderLevel).keys()].map((num) => `h${num + 1}`);

// Takes the table of contents, and flattens it into a list.
function flatten(table: TableOfContentsItem | TableOfContents, list: ContentsEntry[] = [], level = 0): ContentsEntry[] {
  if (table.items === undefined) return list;

  for (const item of table.items) {
    list.push({ title: item.title, url: item.url, level: level });
    if (level + 1 < maxHeaderLevel) {
      flatten(item, list, level + 1);
    }
  }
  return list;
}

export function TableOfContentsNav({ table, className }: Props): JSX.Element {
  const flatTable = useMemo(() => flatten(table), [table]);

  const activeItemId = useActiveItemId(flatTable);

  if (flatTable.length <= 1) {
    return <></>;
  }

  return (
    <Wrapper className={className}>
      <ul>
        {flatTable.map((item) => (
          <li key={item.url}>
            <StyledLink
              sx={{
                ...(item.url === `#${activeItemId}` && {
                  color: "primary.main",
                }),
                ...(item.level === 2 && {
                  paddingLeft: "1rem",
                  fontSize: "0.9375rem",
                }),
                ...(item.level === 3 && {
                  paddingLeft: "2rem",
                  fontSize: "0.875rem",
                }),
              }}
              to={item.url}
            >
              {item.title}
            </StyledLink>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

const useActiveItemId = (flatTable: ContentsEntry[]) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headers = document.querySelectorAll(`#content :is(${includedHeaders.join(", ")})`);
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => entry.target.setAttribute("data-in-viewport", entry.isIntersecting ? "1" : "0"));
      for (const header of headers) {
        if (header.getAttribute("data-in-viewport") == "1") {
          setActiveId(header.id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: [1],
    });

    headers.forEach((header) => {
      observer.observe(header);
    });

    return () => observer.disconnect();
  }, [flatTable]);

  return activeId;
};

export default TableOfContentsNav;
