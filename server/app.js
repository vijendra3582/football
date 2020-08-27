require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin.route');
const orgnizationRoutes = require('./routes/orgnization.route');
const clubRoutes = require('./routes/club.route');
const teamRoutes = require('./routes/team.route');
const playerRoutes = require('./routes/player.route');
const locationRoutes = require('./routes/location.route');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/orgnization', orgnizationRoutes);
app.use('/club', clubRoutes);
app.use('/team', teamRoutes);
app.use('/player', playerRoutes);
app.use('/location', locationRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/api/static", express.static(path.join(__dirname, 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res, next) => {
    return res.status(404).json({
        status: 0,
        message: "Page not found."
    });
});

Mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully.');
    app.listen(process.env.APP_PORT, () => {
        console.log('Server started successfully.');
    });
}).catch(() => {
});