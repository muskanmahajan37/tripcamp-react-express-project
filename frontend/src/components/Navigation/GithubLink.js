import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function GithubLink({ user }) {
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef} style={{width: '200px'}}>
        <div className="dropdown-menu-item">
          <p className="github-a">About the Author</p>
        </div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <a className="github-a" target="_blank" href='https://github.com/suasllc'>Tony Ngo</a>
        </div>
        <div className="dropdown-menu-item">
          <a className="github-a" target="_blank" href='https://github.com/suasllc/tripcamp-react-express-project'>Github Repo</a>
        </div>
        <div className="dropdown-menu-item">
          <a className="github-a" target="_blank" href='https://appacademy.io'>Student at App Academy</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <span
        className="dropdown-menu-parent"
        style={{ marginRight: '20px' }}
      >
        <button className="fab fa-github icon-span" />
        {
          <DropdownMenu />
        }
      </span>
    </>
  );
}
