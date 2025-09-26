import express from "express";
import Monastery from "../models/Monastries.js"; // adjust path if needed

const router = express.Router();

//Create a new monastery
router.post('/', async (req, res) => {
  const {
    name,
    location
  } = req.body;

  if (!name || !location?.country || !location?.state || !location?.city || !location?.address) {
    return res.status(400).json({
      error: "Missing required fields: name and full location details are required."
    });
  }

  try {
    const monastery = new Monastery(req.body);
    const savedMonastery = await monastery.save();
    res.status(201).json(savedMonastery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all monasteries
router.get('/', async (req, res) => {
  try {
    const monasteries = await Monastery.find();
    res.status(200).json({
      count: monasteries.length,
      data: monasteries
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch monasteries" });
  }
});

//Search monasteries by name
router.get('/search', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Query parameter 'name' is required." });
  }

  try {
    const monasteries = await Monastery.find({
      name: { $regex: name, $options: 'i' }
    });

    res.status(200).json({
      count: monasteries.length,
      data: monasteries
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
});

//Update monastery
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const {
    name,
    location
  } = req.body;

  if (!name || !location?.country || !location?.state || !location?.city || !location?.address) {
    return res.status(400).json({
      error: "Missing required fields: name and full location details are required."
    });
  }

  try {
    const updated = await Monastery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: "Monastery not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete monastery
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Monastery.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Monastery not found" });
    }

    res.status(200).json({ message: "Monastery deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete monastery" });
  }
});

export default router;
