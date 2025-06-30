const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointment = sequelize.define('Appointment', {
  patientName: DataTypes.STRING,
  doctorName: DataTypes.STRING,
  date: DataTypes.DATE,
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
  description: DataTypes.STRING
});

module.exports = Appointment;
