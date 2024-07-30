const Router = require("express");
const {
  UserDetail,
  UpdateUserProfile,
  RegisterUser,
} = require("../controllers/authController");

const userRoutes = Router();

userRoutes.post("/register", RegisterUser);
userRoutes.get("/:userId", UserDetail);
userRoutes.post("/:userId", UpdateUserProfile);

module.exports = userRoutes;
