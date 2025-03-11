const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // ✅ Verificar contraseña usando bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // ✅ Crear el token JWT con datos del usuario
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // ✅ El token expira en 1 hora
    );

    // ✅ Devolver el token y el rol
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;
