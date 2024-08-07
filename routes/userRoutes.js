const Router = require("express");
const {
  UserDetail,
  UpdateUserProfile,
  RegisterUser,
  GetAccessToken,
  CreateContact,
  GetContact,
  UpdateContact,
} = require("../controllers/authController");

const userRoutes = Router();

userRoutes.post("/register", RegisterUser);

userRoutes.post("/getToken", GetAccessToken);
userRoutes.post("/create", CreateContact);
userRoutes.get("/getContact", GetContact);
userRoutes.put("/update/:contactId", UpdateContact);

userRoutes.get("/:userId", UserDetail);
userRoutes.post("/:userId", UpdateUserProfile);

module.exports = userRoutes;
