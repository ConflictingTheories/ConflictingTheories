import React from 'react';
import { InstantSearch, Hits, SearchBox, Pagination, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch('http://127.0.0.1:7700');

const SearchPage = () => (
  <InstantSearch indexName="products" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
    <Pagination />
  </InstantSearch>
);

const Hit = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <img src={hit.image} align="left" alt={hit.name} />
      <div className="hit-description">
        <Snippet attribute="description" hit={hit} />
      </div>
      <div className="hit-info">price: {hit.price}</div>
      <div className="hit-info">release date: {hit.releaseDate}</div>
    </div>
  );
};
