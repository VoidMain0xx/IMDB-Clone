// routes/imdbRoutes.js
import express from "express";
import Imdb from "../IMDB/imdb.model.js";

const router = express.Router();

// Create a new entry
router.post("/", async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const imdbEntry = new Imdb(req.body);
      const savedEntry = await imdbEntry.save();
      res.status(201).json(savedEntry);
    } catch (err) {
      console.error("Error saving entry:", err.message);
      res.status(400).json({ error: err.message });
    }
  });

// Get all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Imdb.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific entry by ID
router.get("/:id", async (req, res) => {
  try {
    const entry = await Imdb.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an entry by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await Imdb.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await Imdb.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
