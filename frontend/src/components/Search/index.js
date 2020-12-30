
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as searchActions from '../../store/search';

import './Search.css';

export default function MainSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const onInputChange = e => {
    e.preventDefault();
    setSearchValue(e.target.value);
    dispatch(searchActions.setSearchPOJO({text: e.target.value}));
    console.log("search box value:", e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(searchActions.setSearchPOJO({text: searchValue}));
    setSearchValue("");
  }
  return (
    <form 
      type='submit'
      className='search-over-banner-div'
      onSubmit={handleSubmit}
    >
      <i className="fas fa-search search-icon-class" ></i>
      <input
        className='main-search-bar'
        type='text'
        placeholder='Enter anything to search'
        value={searchValue}
        onChange={onInputChange}
      />
    </form>
  );
}