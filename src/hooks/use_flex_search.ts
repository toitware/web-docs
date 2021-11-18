import { Document, Id } from "flexsearch";
import { graphql, useStaticQuery } from "gatsby";
import { useEffect, useMemo, useState } from "react";

type SearchGraphType = {
  siteSearch: {
    index: string;
    documentConfig: string;
  };
};

export type SearchResultDocument = {
  id: string;
  title: string;
  excerpt: string;
  path: string;
};

/**
 * Provides the system preference for dark mode and dynamically adapts to
 * changes.
 */
export const useFlexSearch = (query: string): SearchResultDocument[] => {
  const {
    siteSearch: { documentConfig: documentConfigJSON, index: indexJSON },
  }: SearchGraphType = useStaticQuery(graphql`
    query SiteSearch {
      siteSearch {
        index
        documentConfig
      }
    }
  `);
  // Create the search document with the config generated by our server.
  const document = useMemo(() => new Document(JSON.parse(documentConfigJSON)), [documentConfigJSON]);

  // Import the search index asynchronously.
  const [indexImported, setIndexImported] = useState(false);
  useEffect(() => {
    const index = JSON.parse(indexJSON) as { [key: string]: unknown };

    void (async () => {
      for (const key of Object.keys(index)) {
        await document.import(key, index[key]);
      }
      setIndexImported(true);
    })();
  }, [setIndexImported, indexJSON, document]);

  // Finally, handle the actual search.
  const [results, setResults] = useState<SearchResultDocument[]>([]);
  useEffect(() => {
    if (!indexImported) return;
    if (!query) {
      setResults([]);
      return;
    }

    const fieldResults = document.search(query, { enrich: true });

    type IdWithDoc = Id & {
      id: string;
      doc: SearchResultDocument;
    };

    const results = [];
    // Preventing the same document to appear twice.
    const usedKeys: { [key: string]: boolean } = {};

    for (const { result } of fieldResults) {
      for (const doc of result) {
        // The type handling is pretty ugly, but flexsearch doesn't export the
        // types properly at this moment.
        const castedDoc = doc as IdWithDoc;
        if (!usedKeys[castedDoc.id]) {
          results.push({ ...castedDoc.doc, id: castedDoc.id });
          usedKeys[castedDoc.id] = true;
        }
      }
    }
    setResults(results);
  }, [query, indexImported, document]);

  return results;
};

export default useFlexSearch;
