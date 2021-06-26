import React, { useState, useContext } from "react";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import WatchLaterRoundedIcon from "@material-ui/icons/WatchLaterRounded";
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../App'
import "./Sidebar.css";

const iconStyle = (fontsize) => {
  return {
    fill: "#39464d",
    stroke: "#1a1a2c",
    strokeWidth: 0,
    fontSize: fontsize,
  };
};

function Sidebar() {
  const { state, dispatch } = useContext(UserContext);

  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebar = () =>
    setSidebarActive((sidebarActive) => !sidebarActive);

  return (
    <>
      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h3>MailSheduler</h3>
        <div className="sidebar__menu">
          <NavLink
            to="/"
            exact
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="Home"
            data-for="sidebarTooltip"
            onClick={toggleSidebar}
          >
            <HomeRoundedIcon
              className="sidebar__menuIcon"
              style={iconStyle(36)}
            /> <h3>Home</h3>
          </NavLink>
          <NavLink
            to="/history"
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="History"
            data-for="sidebarTooltip"
            onClick={toggleSidebar}
          >
            <WatchLaterRoundedIcon
              className="sidebar__menuIcon"
              style={iconStyle(32)}
            /> <h3>History</h3>
          </NavLink>
          <NavLink
            to="/new_mail"
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="Add a Mail"
            data-for="sidebarTooltip"
            onClick={toggleSidebar}
          >
            <LibraryAddRoundedIcon
              color="inherit"
              className="sidebar__menuIcon"
              style={iconStyle(34)
              }
            /> <h3>New Mail</h3>
          </NavLink>
          <NavLink
            to="/logout"
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="Logout"
            data-for="sidebarTooltip"
            onClick={toggleSidebar}
          >
            <ExitToAppRoundedIcon
              className="sidebar__menuIcon"
              style={iconStyle(30)}
            /> <h3>Logout</h3>
          </NavLink>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
