const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');





const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/records', recordRoutes);
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/recordtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

app.use('/auth', authRoutes);
app.use('/records', recordRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

