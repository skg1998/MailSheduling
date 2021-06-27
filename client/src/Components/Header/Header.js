import React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__nav">
        <div className="header__search">
          <SearchRoundedIcon className="header__searchIcon" />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
