const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentroutes = require('./Routes/student.routes'); // adjust path
const cors = require('cors');
const path = require('path');

app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// View engine

mongoose.connect('mongodb://localhost:27017/student')
.then(() => console.log('Connected to MongoDB successfully!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
 
app.get('/', (req, res) => {
    res.render('index'); // index.ejs ko render karega
});


app.use('/api/students', studentroutes); // ✅ corrected line



app.listen(9999, () => {
  console.log(`Server is running on port 
    9999`);
});
 