const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload-test', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded', filename: req.file.filename });
});

module.exports = router;
