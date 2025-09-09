
import express from "express";
import Bookmark from "../models/Bookmark.js";
import { authMiddleware } from "../utils/auth.js";
const router = express.Router();


//apply middleware to all, routes
router.use(authMiddleware);

// Create
router.post("/", async (req, res) => {
  const bookmark = new Bookmark({ ...req.body, user: req.userId });
  await bookmark.save();
  res.json(bookmark);
});

// Get all for user
router.get("/", async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.userId });
  res.json(bookmarks);
});

// Get one
router.get("/:id", async (req, res) => {
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.userId });
  if (!bookmark) return res.status(404).json({ message: "Not found" });
  res.json(bookmark);
});

// Update
router.put("/:id", async (req, res) => {
  const bookmark = await Bookmark.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!bookmark) return res.status(404).json({ message: "Not found" });
  res.json(bookmark);
});

// Delete
router.delete("/:id", async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!bookmark) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
