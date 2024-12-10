const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');
const connectDB = require('C:\\Users\\ASUS\\WebstormProjects\\backend\\config\\dbConfig.js');

dotenv.config();
const app = express();

// MongoDB 연결
connectDB();

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API 라우터 연결
app.use('/api/jobs', jobRoutes);

module.exports = app;
