import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Users from "./user/Users.js";

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
