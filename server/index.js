const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose.connect('mongodb+srv://om20082003:LIPnAjJlfoIpKqIT@cluster1.d7mr4fq.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
