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

module.exports = { UpdateUserProfile, UserDetail, RegisterUser };
