import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import {
  sendConfirmationEmail,
  sendOtpResetPassword,
} from "../utils/nodemail.js";
import { autoGeneratePassword, generateToken } from "../utils/helper.js";

export const register = async (req, res, next) => {
  try {
    const isExistedUser = await User.findOne({ email: req.body.email });
    if (isExistedUser) {
      return next(errorHandler(400, "user is already exist"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Generate verification token
    const token = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      ...req.body,
      password: hash,
      verificationToken: token,
    });

    await newUser.save();

    const { verificationToken } = newUser._doc;

    // Send comfirmation email
    sendConfirmationEmail(req.body.email, verificationToken);

    return res
      .status(201)
      .json({ message: "create user sucessfully", verificationToken });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(errorHandler(404, "not found"));
    }

    if (!user.verified) {
      return next(errorHandler(400, "email was not verified"));
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return next(errorHandler(400, "wrong password"));
    }

    const token = await generateToken({ id: user._id });

    const {
      password: pass,
      resetPasswordOtp,
      resetPasswordExpires,
      verified,
      verificationToken,
      ...rest
    } = user._doc;

    return res
      .status(200)
      .json({ message: "login user sucessfully", results: rest, token });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const generatedPassword = autoGeneratePassword();

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      const newUser = new User({
        ...req.body,
        verified: true,
        password: hash,
      });

      await newUser.save();

      const token = await generateToken({ id: newUser._id });

      const {
        password: pass,
        resetPasswordOtp,
        resetPasswordExpires,
        verified,
        verificationToken,
        ...rest
      } = newUser._doc;

      return res
        .status(201)
        .json({ message: "create user sucessfully", results: rest, token });
    }

    const token = await generateToken({ id: user._id });

    const {
      password: pass,
      resetPasswordOtp,
      resetPasswordExpires,
      verified,
      verificationToken,
      ...rest
    } = user._doc;

    return res.status(200).json({
      message: "login user sucessfully",
      results: rest,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: "Invalid verification token" });
    }

    user.verified = true;

    const newUser = await user.save();

    const { verified } = newUser._doc;

    return res
      .status(200)
      .json({ message: "Verify email successfully", verified });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, password, confirmPassword, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if OTP expired
    if (user.resetPasswordExpires < Date.now()) {
      return next(errorHandler(400, "OTP has expired"));
    }

    // Check if OTP not match
    if (user.resetPasswordOtp !== otp) {
      return next(errorHandler(400, "Invalid OTP"));
    }

    // Validate and update the password
    if (password !== confirmPassword) {
      return next(
        errorHandler(400, "Password and confirm password do not match")
      );
    }

    // Update password and reset OTP & expire time
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check user
    if (!user) {
      return next(errorHandler(404, "not found"));
    }

    // Generate OTP code and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    await sendOtpResetPassword(user.email, otp);

    return res
      .status(200)
      .json({ message: "OTP code has been sent to your email" });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(errorHandler(404, "not found"));
    }

    // Generate verification token
    const token = crypto.randomBytes(20).toString("hex");

    user.verificationToken = token;

    await user.save();

    const { verificationToken } = user._doc;

    // Send comfirmation email
    sendConfirmationEmail(req.body.email, verificationToken);

    return res
      .status(200)
      .json({ message: "Verification email has been sent" });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(errorHandler(404, "not found"));
    }

    // Generate OTP code and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    await sendOtpResetPassword(user.email, otp);

    return res
      .status(200)
      .json({ message: "OTP code has been sent to your email" });
  } catch (error) {
    next(error);
  }
};
