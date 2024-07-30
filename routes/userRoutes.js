// import { Router } from 'express';
const Router = require("express");
const {
  UserDetail,
  UpdateUserProfile,
} = require("../controllers/authController");

const userRoutes = Router();

userRoutes.get("/:userId", UserDetail);
userRoutes.post("/:userId", UpdateUserProfile);

module.exports = userRoutes;
