const axios = require("axios");

// create user in salseforce
const CreateContact = async (body, token) => {
  try {
    const response = await axios.post(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

// get users from salesforce
const GetContact = async (req, res) => {
  try {
    const userId = req.params.contactId;
    const accessToken = req.headers.authorization.split(" ")[1];

    const url = `${process.env.SALESFORCE_BASEURL}/query/?q=SELECT+Id,Name,FirstName,LastName,Email,AccountId,Contact_ID__c,Account.Name+from+Contact+WHERE+AuthZeroId__c+=+'${userId}'`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data.records[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user in salesforce
const UpdateContact = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const contactId = req.params.contactId;

    const response = await axios.patch(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/${contactId}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
