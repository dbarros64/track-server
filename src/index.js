require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:Russell@cluster0.esquo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to Mongo', err)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
});


// PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('Listening on Port 3000')
});