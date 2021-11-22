import { InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { globalHistory } from "@reach/router";
import clsx from "clsx";
import { Link, navigate } from "gatsby";
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useClickOutside from "../../hooks/use_click_outside";
import useFlexSearch from "../../hooks/use_flex_search";
import useLocationQuery from "../../hooks/use_location_query";
import useResultSelection from "../../hooks/use_result_selection";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  results: {
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
  },
  searchField: {
    position: "absolute",
    height: "2rem",
    top: "-1rem",
    right: 0,
    width: "16rem",
    maxWidth: "calc(100vw - 7rem)",
    transition: "all 200ms ease-in-out",
    background: "rgba(255, 255, 255, 0.1)",
  },
  searchFieldFocused: {
    width: "min(30rem, calc(100vw - 7rem))",
  },
  searchFieldOutline: {
    border: `1px solid ${theme.palette.text.primary}`,
  },
  noResults: {
    textAlign: "center",
    padding: "3rem 0",
    fontWeight: "bold",
  },
  result: {
    margin: "0.75rem 0",
    "&:first-of-type": {
      marginTop: 0,
    },
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  resultLink: {
    display: "block",
    padding: "0.75rem",
    borderRadius: "4px",
    color: theme.palette.text.primary,
  },
  resultLinkActive: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  resultTitle: {
    margin: 0,
    fontSize: "0.875rem",
  },
  resultExcerpt: {
    margin: 0,
    overflow: "ellipse",
  },
}));

type Props = {
  className?: string;
};

const NO_SELECTION = -1;

function SearchBar({ className }: Props): JSX.Element {
  const classes = useStyles();

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
    <div className={clsx(classes.container, className)} ref={containerRef}>
      <form onSubmit={onSubmit} autoComplete="off">
        <OutlinedInput
          inputRef={inputRef}
          className={clsx(classes.searchField, showResults && classes.searchFieldFocused)}
          fullWidth
          name="search"
          type="search"
          placeholder={placeholderText}
          value={query}
          classes={{ notchedOutline: classes.searchFieldOutline, focused: classes.searchFieldFocused }}
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
        <div className={classes.results}>
          {results.length == 0 && <div className={classes.noResults}>No results</div>}
          {results.length > 0 && (
            <ul role="listbox">
              {results.map((result, index) => (
                <li
                  key={result.id}
                  className={classes.result}
                  onMouseOver={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <Link
                    to={result.path}
                    className={clsx([classes.resultLink, { [classes.resultLinkActive]: index === selectedIndex }])}
                  >
                    <h2 className={classes.resultTitle}>{result.title}</h2>
                    <p className={classes.resultExcerpt}>{result.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
