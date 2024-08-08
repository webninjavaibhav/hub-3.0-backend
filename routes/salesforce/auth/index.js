const Router = require("express");

const { GetAccessToken } = require("../../../controllers/salesforce/auth");
const authRoutes = Router();

authRoutes.post("/getToken", GetAccessToken);
module.exports = authRoutes;
