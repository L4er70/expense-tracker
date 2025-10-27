require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/expenses', require('./routes/expense'));

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));