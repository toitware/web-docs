import React, { useState } from "react";
import { StoreItem, useFlexSearch } from "react-use-flexsearch";
import { graphql, Link, useStaticQuery } from "gatsby";
import { InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { FiSearch } from "react-icons/fi";
import { primaryBlue, whiteBlueTheme } from "../../theme";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  results: {
    position: "absolute",
    top: "2.8rem",
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
    top: "-1.75rem",
    right: 0,
    width: "15rem",
    transition: "all 200ms ease-in-out",
    "&.Mui-focused": {
      width: "25rem",
    },
  },
  noResults: {
    textAlign: "center",
    padding: "3rem 0",
    fontWeight: "bold",
  },
  result: {
    margin: "0.75rem 0",
    padding: "0.75rem",
    borderRadius: "4px",
    "&:hover": {
      background: primaryBlue.alpha(0.1).string(),
    },
    "&:first-of-type": {
      marginTop: 0,
    },
    "&:last-of-type": {
      marginBottom: 0,
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
  resultLink: {
    color: theme.palette.text.primary,
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

function SearchBar(): JSX.Element {
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
    <div className={classes.container}>
      <form autoComplete="off">
        <OutlinedInput
          className={classes.searchField}
          fullWidth
          id="password"
          name="password"
          type="search"
          placeholder="Search"
          value={query}
          onChange={(_) => {
            setQuery(_.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <FiSearch />
            </InputAdornment>
          }
        />
      </form>
      {query != "" && (
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
