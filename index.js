require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const next = require('next');
const connectDB = require('./src/db');

const userRoutes = require('./src/routes/users');

// Si está en desarrollo o producción
const dev = process.env.NODE_ENV !== 'production';

// Crear la aplicación Next.js
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const server = express();

  // ✅ Registrar el endpoint en el servidor Express
  server.use('/api/users', userRoutes);
  
  // Middleware para leer JSON
  server.use(express.json());

  // Conectar a MongoDB
  await connectDB();

  // CORS para permitir solicitudes entre dominios (si es necesario)
  const cors = require('cors');
  server.use(cors());

  // **API ROUTES**
  const authRoutes = require('./src/routes/auth');
  const protectedRoutes = require('./src/routes/protected');

  server.use('/api/auth', authRoutes);
  server.use('/api/protected', protectedRoutes);

  // **Páginas de Next.js**
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Iniciar el servidor
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Error preparando Next.js:', err);
});
