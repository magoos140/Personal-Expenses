const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const sequelize = require('./config');
const expensesRoutes = require('./routes/expenses');
const categoriesRoutes = require('./routes/categories');

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON

app.use('/api/expenses', expensesRoutes);
app.use('/api/categories', categoriesRoutes);

// Sincronizar la base de datos y arrancar el servidor
const startServer = async () => {
  try {
    await sequelize.sync(); // Sincroniza modelos con la base de datos
    app.listen(3001, () => {
      console.log('Servidor corriendo en http://localhost:3001');
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startServer();
