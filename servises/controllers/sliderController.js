const { Op } = require('sequelize');
const slider = require("../models/slider"); // Make sure this path matches your file structure

// CREATE SLIDER
const createSlider = async (req, res) => {
    try {
        const { slider_link, slider_name } = req.body;
        const slider_url = req.file ? req.file.filename : null;

        // Check if required fields are present
        if (!slider_link || !slider_name || !slider_url) {
            return res.status(400).json({ error: 'Missing required fields: slider_link, slider_name, or slider_url' });
        }

        // Create new slider
        const data = await slider.create({
            slider_link,
            slider_name,
            slider_url
        });

        return res.status(201).json({ success: true, message: "Slider created successfully!", data });
    } catch (error) {
        console.error("Error creating slider:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET ALL SLIDERS
const getSlider = async (req, res) => {
    try {
        const data = await slider.findAll(); // You can add sorting here if needed
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return res.status(500).json({ error: "Failed to fetch sliders" });
    }
};

module.exports = {
    createSlider,
    getSlider
};
