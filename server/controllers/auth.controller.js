import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    res.cookie("t", token, { expired: new Date() + 9999 });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Successfully signed out" });
};

const requireSignin = (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err)
        return res.status(401).json({ message: "User not authenticated" });

      req.auth = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile.id === req.auth.id;
  if (!authorized) {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
