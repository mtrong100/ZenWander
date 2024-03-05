import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().limit(5);

    if (!users || users.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findById(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    const { password, resetPasswordOtp, resetPasswordExpires, ...rest } =
      data._doc;

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Follow a user
export const followUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (!userToFollow) {
      return next(errorHandler(404, "User not found!"));
    }

    if (!currentUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Toggle follow
    if (currentUser.following.includes(id)) {
      currentUser.following = currentUser.following.filter(
        (item) => !item.equals(id)
      );

      userToFollow.followers = userToFollow.followers.filter(
        (item) => !item.equals(userId)
      );

      await currentUser.save();
      await userToFollow.save();

      return res.json({ message: "Unfollowed user successfully" });
    } else {
      currentUser.following.push(id);
      userToFollow.followers.push(userId);

      await userToFollow.save();
      await currentUser.save();
      return res.json({ message: "Followed user successfully" });
    }
  } catch (error) {
    next(error);
  }
};

/* CRUD */
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    const { password, resetPasswordOtp, resetPasswordExpires, ...rest } =
      data._doc;

    return res.status(200).json({ message: "user updated", results: rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
