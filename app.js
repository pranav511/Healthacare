const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ this line is mandatory

// Routes
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);


// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});
