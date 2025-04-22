const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, phoneNumber, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName
    },
    email,
    password: hashPassword,
    phoneNumber,
    vehicle: {
      color: vehicle.color,
      plateNumber: vehicle.plateNumber,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    }
  });
  const token = captain.generateToken();
  res.status(201).json({ token, captain });
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find captain by email and include password field for verification
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Verify password
  const isPasswordMatch = await captain.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = captain.generateToken();

  // Set cookie and return response
  res.cookie("token", token);

  // Return captain without password
  const captainWithoutPassword = await captainModel.findById(captain._id);
  res.status(200).json({ token, captain: captainWithoutPassword });
};

module.exports.logout = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("token");

    // Get token from cookie or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Add token to blacklist
    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    // Captain is already attached to request by auth middleware
    res.status(200).json({ captain: req.captain });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
