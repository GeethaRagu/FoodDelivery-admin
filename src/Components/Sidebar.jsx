import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col w-40 h-screen border-2 border-amber-600 border-t-0 border-l-0 p-5 gap-5">
        <NavLink
          to="/add"
          className="sidebar-option md:flex md:flex-row gap-2 border-1 border-amber-700 bg-amber-100 p-3"
        >
          <img src={assets.add_icon}></img>
          <p className="hidden md:block">Add</p>
        </NavLink>
        <NavLink
          to="/list"
          className="sidebar-option md:flex md:flex-row gap-2 border-1 border-amber-700 bg-amber-100 p-3"
        >
          <img src={assets.order_icon}></img>
          <p className="hidden md:block">List</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="sidebar-option md:flex md:flex-row gap-2 border-1 border-amber-700 bg-amber-100 p-3"
        >
          <img src={assets.order_icon}></img>
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
