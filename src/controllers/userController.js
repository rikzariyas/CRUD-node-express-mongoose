import User from "../models/User.js";

// getting all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: "OK",
      data: users,
    });
  } catch {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

//update user

export const nameUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    user.name = req.body.name;
    await user.save();
    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

//update all
export const replaceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error("user not found");
    }
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

//delete
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error("user not found");
    }
    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
