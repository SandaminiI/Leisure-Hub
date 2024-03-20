import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>User Profile</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/booked-movies"
            className="list-group-item list-group-item-action"
          >
            Booked Movies
          </NavLink>
          <NavLink
            to="/dashboard/user/booked-activities"
            className="list-group-item list-group-item-action"
          >
            Booked Activities and Games
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
