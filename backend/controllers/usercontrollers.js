import User from "../models/usermodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloud.js";
import getDataUri from "../utils/datauri.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phonenumber,
      password,
      role,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !phonenumber ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
        success: false,
      });
    }

    let cloudResponse = null;

    if (req.file) {
      const fileUri = getDataUri(req.file);

      cloudResponse =
        await cloudinary.uploader.upload(
          fileUri.content,
          {
            resource_type: "auto",
          }
        );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse
          ? cloudResponse.secure_url
          : "",
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Server error during registration.",
      success: false,
    });
  }
};


// ================= LOGIN =================

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Email:", email);
    console.log("Requested Role:", role);

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    console.log("Database User Role:", user.role);
    console.log("Frontend Role:", role);

    // Password check
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Role check
    if (user.role !== role) {
      return res.status(400).json({
        message: `Role does not match. Your account is registered as ${user.role}.`,
        success: false,
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("TOKEN CREATED");
    console.log("User ID:", user._id.toString());
    console.log("Role:", user.role);

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: userData,
      });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error during login.",
      success: false,
    });
  }
};




// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Logged out successfully.",
        success: true,
      });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      message: "Server error during logout.",
      success: false,
    });
  }
};


// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phonenumber,
      bio,
      skills,
    } = req.body;

    const userId = req.id;

    console.log("UPDATE PROFILE USER ID:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const file = req.file;

    let cloudinaryResponse = null;

    if (file) {
      const fileUri = getDataUri(file);

      cloudinaryResponse =
        await cloudinary.uploader.upload(
          fileUri.content,
          {
            resource_type: "auto",
          }
        );
    }

    // Basic information
    if (fullname) {
      user.fullname = fullname;
    }

    if (email) {
      user.email = email;
    }

    if (phonenumber) {
      user.phonenumber = phonenumber;
    }

    // Profile
    if (!user.profile) {
      user.profile = {};
    }

    if (bio !== undefined) {
      user.profile.bio = bio;
    }

    if (skills !== undefined) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    if (cloudinaryResponse) {
      user.profile.resume =
        cloudinaryResponse.secure_url;

      user.profile.resumeOriginalname =
        file.originalname;
    }

    await user.save();

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error while updating profile.",
      success: false,
    });
  }
};

// ================= GET CURRENT USER =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "User fetched successfully.",
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error while fetching user.",
      success: false,
    });
  }
};