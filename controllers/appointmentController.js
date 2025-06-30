const Appointment = require('../models/Appointment');

// Create Appointment
exports.createAppointment = (req, res) => {
  Appointment.create(req.body)
    .then(appointment => res.status(201).json(appointment))
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};

// Get Appointments with Pagination
exports.getAppointments = (req, res) => {
  let { page, limit, search } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 5;
  const offset = (page - 1) * limit;

  const whereClause = search
    ? { patientName: { [Appointment.sequelize.Op.like]: `%${search}%` } }
    : {};

  Appointment.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset: offset,
    order: [['date', 'ASC']]
  })
    .then(result => {
      res.json({
        total: result.count,
        page: page,
        pages: Math.ceil(result.count / limit),
        appointments: result.rows
      });
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};

// Update Appointment
exports.updateAppointment = (req, res) => {
  Appointment.update(req.body, { where: { id: req.params.id } })
    .then(([affected]) => {
      if (affected === 0) return res.status(404).json({ message: 'Appointment not found' });
      res.json({ message: 'Appointment updated' });
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};

// Delete Appointment
exports.deleteAppointment = (req, res) => {
  Appointment.destroy({ where: { id: req.params.id } })
    .then(affected => {
      if (affected === 0) return res.status(404).json({ message: 'Appointment not found' });
      res.json({ message: 'Appointment deleted' });
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};
