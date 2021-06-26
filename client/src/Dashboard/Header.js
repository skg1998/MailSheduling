import Reactm, { useContext } from "react";
import { UserContext } from '../App'
import "./Header.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

function Header() {
  const { state, dispatch } = useContext(UserContext);
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
        <h3>{state.username}</h3>
      </div>
    </div>
  );
}
export default Header;
