import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <div className="max-w-screen mx-auto p-4">
      <div className="flex flex-row justify-between items-center ">
        <img src={assets.logo} alt="" className="w-25 h-25"/>
        <img src={assets.profile_image} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
