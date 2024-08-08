const { GetAccessToken } = require("../salesforce/auth");
const { CreateContact, UpdateContact } = require("../salesforce/contacts");

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

// get all users
const GetAllUsers = async (req, res) => {
  try {
    const response = await fetch(`${process.env.OKTA_BASEURL}/api/v1/users`, {
      method: "GET",
      headers: {
        Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
      },
    });
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
    res.status(200).json(parsedVal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// register a user
const RegisterUser = async (req, res) => {
  try {
    // to store the data in okta
    const response = await fetch(
      `${process.env.OKTA_BASEURL}/api/v1/users?activate=false`,
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
    console.log("Okta registered :-");

    // get the userId from okta
    const userId = parsedVal.id;

    // modify the object based on salseforce
    const obj = {
      FirstName: req.body.profile.firstName,
      LastName: req.body.profile.lastName,
      Email: req.body.profile.email,
      AuthZeroId__c: userId,
    };

    // get the access token from okta
    const token = await GetAccessToken();
    console.log("Salesforce access toke :-");

    if (!token) {
      res
        .status(400)
        .json({ message: "Failed to get access token from Salesforce" });
    }

    // create contact in salesforce
    const result = await CreateContact(obj, token.access_token);
    console.log("Register in salesforce :-");

    if (result) {
      // send email from okta once the user create contact i salesforce
      await fetch(
        `${process.env.OKTA_BASEURL}/api/v1/users/${userId}/lifecycle/activate?sendEmail=true`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
          },
        }
      );
      res.status(200).json(parsedVal);
    } else {
      res
        .status(400)
        .json({ message: "Failed to create contact in Salesforce" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  UpdateUserProfile,
  GetAllUsers,
  UserDetail,
  RegisterUser,
};
