const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static folders
app.use(express.static(path.join(__dirname, 'public'))); // for index.html, admin.js, and other static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // for uploaded images
app.use('/startic-images', express.static(path.join(__dirname, 'startic-images'))); // for static images

// Middleware for parsing form data
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'), // Store files in the uploads folder within public
  filename: (req, file, cb) => cb(null, file.originalname) // Preserve original file name
});
const upload = multer({ storage });

// Serve index.html (from the root of your project)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html')); // Assuming your index.html is in the 'public' folder
});

// Serve admin.html (if applicable)
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html')); // Assuming your admin.html is also in 'public'
});

// Upload endpoint for handling file uploads
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.json({ filePath: `/uploads/${req.file.filename}` }); // Returns the path to the uploaded file
});

// Catch-all handler for 404 errors
app.use((req, res) => {
  res.status(404).send('Page not found'); // Handles 404 errors for any unknown route
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
