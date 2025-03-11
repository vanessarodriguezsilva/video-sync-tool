const express = require('express');
const authenticate = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// ✅ Obtener todos los usuarios (solo admin y superadmin)
router.get('/', authenticate(['admin', 'superadmin']), async (req, res) => {
  try {
    // ✅ Obtener todos los usuarios sin mostrar "__v" y "_id"
    const users = await User.find().select('-__v');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
