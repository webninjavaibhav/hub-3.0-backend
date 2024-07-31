const Router = require("express");
const {
  GetBanners,
  GetBanner,
  UpdateBanner,
  CreateBanner,
  DeleteBanner,
} = require("../controllers/bannerController");

const bannerRoutes = Router();

bannerRoutes.get("/", GetBanners);
bannerRoutes.get("/:bannerId", GetBanner);
bannerRoutes.put("/:bannerId", UpdateBanner);
bannerRoutes.post("/create", CreateBanner);
bannerRoutes.delete("/:bannerId", DeleteBanner);

module.exports = bannerRoutes;
