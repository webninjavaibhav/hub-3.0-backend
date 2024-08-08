const axios = require("axios");
const qs = require("qs");

// create user in salseforce
const CreateContact = async (req, res) => {
  try {
    const salesforceAccessToken = req.headers.authorization.split(" ")[1];
    const response = axios.post(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${salesforceAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// get users from salesforce
const GetContact = async (req, res) => {
  try {
    const salesforceAccessToken = req.headers.authorization.split(" ")[1];
    const url = `${process.env.SALESFORCE_BASEURL}/query/?q=SELECT+Id,Name,AccountId,Account.Name+from+Contact`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${salesforceAccessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user in salesforce
const UpdateContact = async (req, res) => {
  try {
    const salesforceAccessToken = req.headers.authorization.split(" ")[1];
    const contactId = req.params.id;

    const response = await axios.patch(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/${contactId}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${salesforceAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  CreateContact,
  GetContact,
  UpdateContact,
};
