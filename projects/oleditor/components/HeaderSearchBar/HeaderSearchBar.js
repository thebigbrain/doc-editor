import React, { useState } from 'react';
import history from '~/utils/history';
import { searchUrl } from '@csb/common/lib/utils/url-generator';
import { Container, Input, SearchButton, SearchIcon } from './elements';

export const HeaderSearchBar = () => {
  const [query, setQuery] = useState(``);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    history.push(searchUrl(query));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Input
          placeholder="Search sandboxes"
          value={query}
          onChange={handleChange}
        />
        <SearchButton>
          <SearchIcon/>
        </SearchButton>
      </form>
    </Container>
  );
};
