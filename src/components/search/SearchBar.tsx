import { InputAdornment, OutlinedInput, styled } from "@mui/material";
import { globalHistory } from "@reach/router";
import { Link, navigate } from "gatsby";
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useClickOutside from "../../hooks/use_click_outside";
import useFlexSearch from "../../hooks/use_flex_search";
import useLocationQuery from "../../hooks/use_location_query";
import useResultSelection from "../../hooks/use_result_selection";

const Container = styled("div")`
  position: relative;
`;

const StyledInput = styled(OutlinedInput)`
  position: absolute;
  height: 2rem;
  top: -1rem;
  right: 0;
  width: 16rem;
  max-width: calc(100vw - 7rem);
  transition: all 200ms ease-in-out;
  background: rgba(255, 255, 255, 0.1);

  &.Mui-focused {
    width: min(30rem, calc(100vw - 7rem));
  }
  &.MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => theme.palette.text.primary};
  }
`;

const Results = styled("div")(({ theme }) => ({
  zIndex: 100,
  position: "absolute",
  top: "1rem",
  right: "0",
  background: theme.palette.background.paper,
  borderRadius: "6px",
  padding: "0.75rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "min(30rem, calc(100vw - 7rem))",
  maxHeight: "80vh",
  overflowY: "auto",
  "& ul": {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
}));

const NoResults = styled("div")({
  textAlign: "center",
  padding: "3rem 0",
  fontWeight: "bold",
});

const Result = styled("li")({
  margin: "0.75rem 0",
  "&:first-of-type": {
    marginTop: 0,
  },
  "&:last-of-type": {
    marginBottom: 0,
  },
});

const ResultLink = styled(Link)(({ theme }) => ({
  display: "block",
  padding: "0.75rem",
  borderRadius: "4px",
  color: theme.palette.text.primary,
}));

const ResultTitle = styled("h2")({
  margin: 0,
  fontSize: "0.875rem",
});
const ResultExcerpt = styled("p")({
  margin: 0,
  overflow: "ellipse",
});

type Props = {
  className?: string;
};

const NO_SELECTION = -1;

function SearchBar({ className }: Props): JSX.Element {
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const unfocusSearch = useCallback(() => {
    inputRef.current?.blur();
    setShowResults(false);
  }, [inputRef, setShowResults]);

  // Hide the results every time a navigation happens...
  useEffect(() => globalHistory.listen(unfocusSearch), [unfocusSearch]);
  // ...or the user clicks outside
  useClickOutside(containerRef, unfocusSearch);

  // Handle global shortcuts like Escape and /
  useEffect(() => {
    function handleKeys(e: KeyboardEvent) {
      if (inputRef.current) {
        if (document.activeElement == inputRef.current && e.key === "Escape") {
          e.preventDefault();
          unfocusSearch();
        } else if (
          !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) &&
          e.key === "/"
        ) {
          e.preventDefault();
          inputRef.current.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputRef, unfocusSearch]);

  const [query, setQuery] = useState(useLocationQuery());

  const results = useFlexSearch(query);

  const [selectedIndex, setSelectedIndex] = useResultSelection(results.length, showResults);

  // Reset the selected index, every time the query changes.
  useEffect(() => setSelectedIndex(NO_SELECTION), [query, setSelectedIndex]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (results.length > 0 && selectedIndex >= 0) {
      await navigate(results[selectedIndex].path);
    } else {
      await navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const placeholderText = isFocused ? "Type your search" : "Search (Press / to focus)";

  return (
    <Container className={className} ref={containerRef}>
      <form onSubmit={onSubmit} autoComplete="off">
        <StyledInput
          inputRef={inputRef}
          fullWidth
          name="search"
          type="search"
          placeholder={placeholderText}
          value={query}
          onChange={(_) => {
            setQuery(_.target.value);
            setShowResults(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query) setShowResults(true);
          }}
          onBlur={() => setIsFocused(false)}
          startAdornment={
            <InputAdornment position="start">
              <FiSearch />
            </InputAdornment>
          }
        />
      </form>
      {showResults && query != "" && (
        <Results>
          {results.length == 0 && <NoResults>No results</NoResults>}
          {results.length > 0 && (
            <ul role="listbox">
              {results.map((result, index) => (
                <Result
                  key={result.id}
                  onMouseOver={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <ResultLink
                    to={result.path}
                    sx={{
                      ...(index === selectedIndex && {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }),
                    }}
                  >
                    <ResultTitle>{result.title}</ResultTitle>
                    <ResultExcerpt>{result.excerpt}</ResultExcerpt>
                  </ResultLink>
                </Result>
              ))}
            </ul>
          )}
        </Results>
      )}
    </Container>
  );
}

export default SearchBar;
