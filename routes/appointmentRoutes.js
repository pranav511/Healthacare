const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', verifyToken, appointmentController.createAppointment);
router.get('/', verifyToken, appointmentController.getAppointments);
router.put('/:id', verifyToken, appointmentController.updateAppointment);
router.delete('/:id', verifyToken, appointmentController.deleteAppointment);



// Add this route before other routes
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ filename: req.file.filename });
});


module.exports = router;
