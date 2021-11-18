import { useLocation } from "@reach/router";
import queryString from "query-string";

export function useLocationQuery(): string {
  const location = useLocation();
  const locationQuery = queryString.parse(location.search);
  let query = "";
  if (locationQuery.q) {
    query = locationQuery.q.toString();
  }
  return query;
}

export default useLocationQuery;
