const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join("/tmp", "bannerData.json");

// Helper function to read JSON data
const readData = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify([
        {
          id: "1",
          title: "SHOW STAT",
          description: "Keep moving forward untill reach your destination",
          link: "link",
        },
        {
          id: "2",
          title: "Play ground",
          description: "Having fun activity with real based learning",
          link: "link",
        },
        {
          id: "3",
          title: "Stay Connected",
          description: "Keep every student engaged with good activity",
          link: "link",
        },
      ])
    ); // Create an empty array if file does not exist
  }
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

// Helper function to write JSON data
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Generate banner id
const generateId = () => uuidv4();

const GetAllNotificationBanners = (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetNotificationBanner = (req, res) => {
  try {
    const data = readData();
    const banner = data.find((b) => b.id === req.params.bannerId);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const UpdateNotificationBanner = (req, res) => {
  try {
    const { bannerId: id } = req.params;
    const updatedItem = req.body;
    const data = readData();
    const index = data.findIndex((i) => i.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem };
      writeData(data);
      res.json(data[index]);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateNotificationBanner = (req, res) => {
  try {
    const newBanner = {
      id: generateId(),
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
    };
    const data = readData();

    if (data.length <= 2) {
      data.push(newBanner);
      writeData(data);
      res.status(200).json(newBanner);
    } else {
      res.status(400).json({ message: "Cannot create more than 3 banners" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteNotificationBanner = (req, res) => {
  try {
    const { bannerId: id } = req.params;
    const data = readData();
    const index = data.findIndex((i) => i.id === id);

    if (index !== -1) {
      data.splice(index, 1);
      writeData(data);
      res.json({ message: "Banner deleted successfully" });
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  GetAllNotificationBanners,
  GetNotificationBanner,
  UpdateNotificationBanner,
  CreateNotificationBanner,
  DeleteNotificationBanner,
};
