import User from "../models/user.model.js";
import lodash from "lodash";

const create = async (req, res) => {
  try {
    let user = await User.create(req.body);

    user.password = undefined;
    user.salt = undefined;
    user.hashed_password = undefined;

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const userById = async (req, res, next, id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const read = (req, res) => {
  let user = req.profile;

  user.password = undefined;
  user.salt = undefined;
  user.hashed_password = undefined;

  return res.status(200).json(user);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = lodash.extend(user, req.body);
    user.updatedAt = Date.now();
    await user.save();

    user.password = undefined;
    user.salt = undefined;
    user.hashed_password = undefined;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.destroy();

    user.password = undefined;
    user.salt = undefined;
    user.hashed_password = undefined;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default { create, userById, read, list, remove, update };
