require('dotenv').config();
const express = require('express');
const next = require('next');
const connectDB = require('./src/db');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const server = express();
  
  // Middleware para JSON y CORS
  server.use(express.json());

  // Conectar a MongoDB
  await connectDB();

  // Montar las rutas API de autenticación y otras
  const authRoutes = require('./src/routes/auth');
  const protectedRoutes = require('./src/routes/protected');
  server.use('/api/auth', authRoutes);
  server.use('/api/protected', protectedRoutes);

  // Todas las demás rutas las maneja Next.js (páginas)
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log(`✅ Server ready on ${process.env.NEXT_PUBLIC_API_BASE_URL}${PORT}`);
  });
});
