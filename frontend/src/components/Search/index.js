
import { useState } from 'react';
// import {}

import './Search.css';

export default function MainSearchBar(){

  return (
    <div className='search-over-banner-div'>
      <i className="fas fa-search search-icon-class" ></i>
      <input className='main-search-bar' type='text' placeholder='Enter anything to search' />
    </div>
  );
}