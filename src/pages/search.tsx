import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import { FiSearch } from "react-icons/fi";
import useFlexSearch from "../hooks/use_flex_search";
import useLocationQuery from "../hooks/use_location_query";

const Content = styled.div`
  width: 46rem;
  max-width: 100%;
  padding: 2rem;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Result = styled(Link)`
  display: block;
  padding: 1.5rem 1.5rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.text.primary};
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;
const ResultTitle = styled.h3`
  margin: 0;
`;
const ResultExcerpt = styled.p`
  margin: 0;
`;

export function SearchPage(): JSX.Element {
  const query = useLocationQuery();
  const results = useFlexSearch(query);

  return (
    <Content>
      <Title>
        <FiSearch /> {query}
      </Title>
      {results.map((result) => (
        <Result key={result.id} to={result.path}>
          <ResultTitle>{result.title}</ResultTitle>
          <ResultExcerpt>{result.excerpt}</ResultExcerpt>
        </Result>
      ))}
    </Content>
  );
}

export default SearchPage;
