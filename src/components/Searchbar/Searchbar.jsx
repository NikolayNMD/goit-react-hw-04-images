import { useState } from 'react';
import { SearchButton, SearchForm, SearchbarHeader } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon className="icon_search" />
        </SearchButton>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
          name="search"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
