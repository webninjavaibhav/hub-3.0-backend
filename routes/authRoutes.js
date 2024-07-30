// import { Router } from 'express';
const Router = require("express");
const {
  userDetail,
  updateUserProfile,
} = require("../controllers/authController");

const authRoutes = Router();

authRoutes.get("/userInfo/:userId", userDetail);
authRoutes.put("/userInfo/:userId", updateUserProfile);

module.exports = authRoutes;
