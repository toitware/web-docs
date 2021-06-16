import { InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { globalHistory } from "@reach/router";
import clsx from "clsx";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { StoreItem, useFlexSearch } from "react-use-flexsearch";
import useClickOutside from "../../hooks/use_click_outside";

// This style is just added for reference.
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
    width: "30rem",
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
    width: "15rem",
    transition: "all 200ms ease-in-out",
    background: "rgba(255, 255, 255, 0.1)",
  },
  searchFieldFocused: {
    width: "30rem",
  },
  searchFieldOutline: {
    border: "1px solid black",
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
    "&:hover": {
      background: theme.palette.primary.main,
      color: "white",
    },
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

type GraphType = {
  localSearchPages: {
    index: string;
    store: {
      [key: string]: StoreItem;
    };
  };
};

type Props = {
  className?: string;
};

function SearchBar({ className }: Props): JSX.Element {
  const [showResults, setShowResults] = useState(false);

  const elRef = useRef<HTMLDivElement>(null);

  const hideResults = () => setShowResults(false);

  useEffect(() => {
    globalHistory.listen(hideResults);
  }, []);

  useClickOutside(elRef, hideResults);

  const [query, setQuery] = useState("");

  const data: GraphType = useStaticQuery(graphql`
    query LocalSearchQuery {
      localSearchPages {
        index
        store
      }
    }
  `);
  const results = useFlexSearch(query, data.localSearchPages.index, data.localSearchPages.store);

  const classes = useStyles();

  return (
    <div ref={elRef} className={clsx(classes.container, className)}>
      <form autoComplete="off">
        <OutlinedInput
          className={clsx(classes.searchField, showResults && classes.searchFieldFocused)}
          fullWidth
          id="password"
          name="password"
          type="search"
          placeholder="Search"
          value={query}
          classes={{ notchedOutline: classes.searchFieldOutline, focused: classes.searchFieldFocused }}
          onChange={(_) => {
            setQuery(_.target.value);
            setShowResults(true);
          }}
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
            <ul>
              {results.map((result) => (
                <li key={result.id} className={classes.result}>
                  <Link to={result.path} className={classes.resultLink}>
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
