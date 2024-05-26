const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dqcfaeqe5",
    api_key: "221955768794463",
    api_secret: "9GmbyPAX0VhZc0_bxzSKDvYEa64"
});

// Multer storage configuration with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder in Cloudinary
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => path.parse(file.originalname).name,
    },
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // To serve the HTML file

// Endpoint to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file && req.file.path) {
        res.json({ secure_url: req.file.path });
    } else {
        res.status(400).json({ error: 'Failed to upload image' });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
