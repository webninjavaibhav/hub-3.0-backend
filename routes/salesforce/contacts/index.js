const Router = require("express");
const {
  CreateContact,
  GetContact,
  UpdateContact,
} = require("../../../controllers/salesforce/contacts");

const contactRoutes = Router();

contactRoutes.post("/create", CreateContact);
contactRoutes.get("/getContact/:contactId", GetContact);
contactRoutes.put("/update/:contactId", UpdateContact);

module.exports = contactRoutes;
