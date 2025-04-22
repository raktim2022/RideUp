const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, user });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isMatcnh = await user.comparePassword(password);
  if (!isMatcnh) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logout successfully" });
};
