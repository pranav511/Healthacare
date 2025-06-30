const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ this line is mandatory

// Routes
app.use('/api/users', userRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});
