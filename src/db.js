const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('❌ Error en la conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
