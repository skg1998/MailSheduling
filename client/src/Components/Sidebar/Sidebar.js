import React, { useState } from "react";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import WatchLaterRoundedIcon from "@material-ui/icons/WatchLaterRounded";
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Divider from '@material-ui/core/Divider';

import { NavLink, useHistory } from "react-router-dom";
import { removeUserSession } from "../../utils/AuthHandler"
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
  const [sidebarActive, setSidebarActive] = useState(false);
  const history = useHistory();
  const toggleSidebar = () =>
    setSidebarActive((sidebarActive) => !sidebarActive);


  const logout = () => {
    removeUserSession();
    history.push('/login');
  }

  return (
    <>
      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h3 className="heading">MailSheduler</h3>
        <Divider className="divider" />
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
              style={iconStyle(28)}
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
          <div
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="Logout"
            data-for="sidebarTooltip"
            onClick={logout}
          >
            <ExitToAppRoundedIcon
              className="sidebar__menuIcon"
              style={iconStyle(30)}
            /> <h3>Logout</h3>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
