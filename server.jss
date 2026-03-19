const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Route to fetch website content
app.post("/fetch", async (req, res) => {
    let url = req.body.url;

    // Basic validation
    if (!url) {
        return res.status(400).send("<h2>❌ Please enter a URL</h2>");
    }

    // Add protocol if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send("<h2>❌ Invalid URL or Unable to Fetch</h2>");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
