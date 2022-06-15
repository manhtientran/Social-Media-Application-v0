import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./auth/Signin";
import PrivateRoute from "./auth/PrivateRoute.js";

import Home from "./core/Home";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users.js";
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu.js";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route
          path="/users/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
