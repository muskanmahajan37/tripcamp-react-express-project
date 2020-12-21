import React,{ useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function GithubLink({ user }) {
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef}>
        <div className="dropdown-menu-item">
          <a className="github-a" href='https://github.com/suasllc'>Tony Ngo</a>
          </div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <a className="github-a" href='https://github.com/suasllc/fullstack-authenticate-me'>Github Repo</a>
        </div>
      </div>
    );
  }
  return (
    <>
      <span
        className="dropdown-menu-parent"
      >
        <button className="fab fa-github icon-span" />
        {
          <DropdownMenu />
        }
      </span>
    </>
  );
}
