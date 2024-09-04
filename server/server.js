const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRouter = require('./routers/userRouter');


const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use(cors({
  origin: 'http://localhost:8000', 
  credentials: true               
}));*/

// Routes
app.use('/api/users', userRouter);

// Testing API
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
