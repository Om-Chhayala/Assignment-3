const jwt = require("jsonwebtoken");
const express = require("express");
const { Bookmark } = require("../db");
const { SECRET } = require("../middleware");
const {authenticateJwt} = require("./../middleware/index");
const router = express.Router();

router.post("/bookmark",authenticateJwt, async (req, res) => {
  try {
    const { id, title, image } = req.body;
    const userId = req.user.id;
    const bookmark = new Bookmark({ userId, id, title, image });
    await bookmark.save();
    res.status(201).json({ message: "Bookmark saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/bookmarks",authenticateJwt, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ userId });
    res.json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
