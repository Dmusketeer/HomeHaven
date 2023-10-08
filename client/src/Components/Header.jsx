import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logoHH.jpg";
import { FaSearch } from "react-icons/fa";
function Header() {
  return (
    <header className="bg-[#E4E8DF]">
      <div className="main-div flex items-center place-content-between">
        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              alt="HomeHaven"
              className="h-24 w-32 cursor-pointer "
            />
          </Link>
        </div>

        <div className="form">
          <form className="flex cursor-pointer items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-[10px] focus:outline-none bg-[#ced1ca] rounded-md w-24 sm:w-64 "
            />
            <FaSearch className="mx-[10px]" />
          </form>
        </div>

        <div className="options mr-2 cursor-pointer">
          <ul className="flex gap-4">
            <Link to="/">
              <li className="font-medium hover:font-bold hidden sm:inline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="font-medium hover:font-bold hidden sm:inline">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li className="font-medium hover:font-bold ">Sign In</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
