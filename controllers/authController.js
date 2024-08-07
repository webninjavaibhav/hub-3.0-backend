const axios = require("axios");
const qs = require("qs");

// get the user details
const UserDetail = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await fetch(
      `${process.env.OKTA_BASEURL}/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
        },
      }
    );
    const parsedVal = await response.json();
    res.status(200).json(parsedVal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update the user profile
const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await fetch(
      `${process.env.OKTA_BASEURL}/api/v1/users/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
        },
        body: JSON.stringify(req.body),
      }
    );
    const parsedVal = await response.json();
    console.log("req.body", req.body);
    res.status(200).json(parsedVal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// register a user
const RegisterUser = async (req, res) => {
  try {
    const response = await fetch(`${process.env.OKTA_BASEURL}/api/v1/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });
    const parsedVal = await response.json();
    res.status(200).json(parsedVal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetAccessToken = async (req, res) => {
  const url = process.env.SALESFORCE_TOKEN_URL;
  const data = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const result = await axios.post(url, qs.stringify(data), config);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
  UpdateUserProfile,
  UserDetail,
  RegisterUser,
  GetAccessToken,
  CreateContact,
  GetContact,
  UpdateContact,
};
