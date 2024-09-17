const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const billRouter = require('./routers/billRouter');

const app = express();

const userRouter = require('./routers/userRouter');

// Define the PORT
const PORT = process.env.PORT || 8000;

// Sequelize instance (your database connection)
const sequelize = new Sequelize(
  process.env.DB,       // Database name
  process.env.DB_USER,   // Database user
  process.env.DB_PASS,   // Database password
  {
    host: process.env.DB_HOST,   // Database host
    dialect: process.env.DB_DIALECT, // Your database dialect (e.g., 'mysql')
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.log('Unable to connect to the database:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/Bill', billRouter); // Fixed the route path (removed extra slash)
app.use('/api/users', userRouter);

// Testing API
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// Synchronize models with the database
sequelize.sync({ force: false })  // Use `sequelize.sync()` instead of `Sequelize.sync()`
  .then(() => {
    console.log('Database and tables synchronized.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { sequelize };
