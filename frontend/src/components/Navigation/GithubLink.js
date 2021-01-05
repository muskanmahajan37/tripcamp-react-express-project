import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function GithubLink({ user }) {
  const dispatch = useDispatch();

  const dropdownMenuRef = useRef(null);

  function DropdownMenu() {
    return (
      <div className=" dropdown-menu" ref={dropdownMenuRef} style={{ width: '200px' }}>
        <div className="dropdown-menu-item">
          <p className="github-dropdownmenu-section-title ">About the Project</p>
        </div>
        {/* <hr className="hr" /> */}
        <div className="dropdown-menu-item">
          <p className="github-a">Student Project</p>
          <p className="github-a">Clone of HipCamp</p>
        </div>
        <div className="dropdown-menu-item">
          <p className="github-a">
            <a target="_blank" href='https://github.com/suasllc/tripcamp-react-express-project'>Github Repo</a>
          </p>
        </div>
        <hr className="hr" />
        <div className="dropdown-menu-item">
          <p className="github-dropdownmenu-section-title ">About the Author</p>
        </div>
        <div className="dropdown-menu-item">
          <p className="github-a">
            <a target="_blank" href='https://github.com/suasllc'>Tony Ngo</a>
          </p>
        </div>
        <div className="dropdown-menu-item">
          <p className="github-a">
            <a target="_blank" href='https://appacademy.io'>App Academy Student</a>
          </p>
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
