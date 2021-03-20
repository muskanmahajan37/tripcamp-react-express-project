
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as searchActions from '../../store/search';

import './Search.css';

export default function MainSearchBar({
  className = 'search-over-banner-div'
}) {
  const searchTerms = useSelector(state => state.searchs);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchActions.setSearchPOJO({ text: searchValue }));
  }, [searchValue]);

  useEffect(() => {
    if (searchTerms[searchTerms.length - 1] && searchTerms[searchTerms.length - 1].text === "") {
      if(searchValue) setSearchValue("");
    }
  }, [searchTerms]);

  const onInputChange = e => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      setSearchValue("");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(searchActions.setSearchPOJO({ text: searchValue }));
    // setSearchValue("");
  }
  return (
    <form
      type='submit'
      className={className}
      onSubmit={handleSubmit}
    >
      <i className="fas fa-search search-icon-class" ></i>
      <input
        className='main-search-bar'
        type='text'
        placeholder='Search spots to stay'
        value={searchValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        autoFocus={window.location.pathname.includes('allspots') ? true : false}
      />
      <i className="fas fa-times search-icon-class"
        style={{ color: 'lightgray' }}
        onClick={e => { e.preventDefault(); setSearchValue("") }}
      />
    </form>
  );
}