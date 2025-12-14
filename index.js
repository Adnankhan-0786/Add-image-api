const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentroutes = require('./Routes/student.routes'); // adjust path

app.use(express.json()); // to parse JSON

mongoose.connect('mongodb://localhost:27017/student')
.then(() => console.log('Connected to MongoDB successfully!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/students', studentroutes); // ✅ corrected line

app.listen(1000, () => {
  console.log('Server is running on port 4444');
});
