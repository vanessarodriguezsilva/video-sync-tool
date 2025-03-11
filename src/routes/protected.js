const express = require('express');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/admin', authenticate(['admin']), (req, res) => {
  res.json({ message: `Hola, ${req.user.role}! Acceso permitido.` });
});

module.exports = router;
