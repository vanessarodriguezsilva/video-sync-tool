const jwt = require('jsonwebtoken');

const authenticate = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o caducado' });
    }
  };
};

module.exports = authenticate;
