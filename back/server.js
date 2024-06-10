const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vName: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    noDays: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model('Reservation', Schema);

app.get("/view", async (req, res) => {
    try {
        const data = await Reservation.find();
        res.send({ vehicle: data });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

app.post("/create", async (req, res) => {
    try {
        const { name, phone, vName, count, noDays } = req.body;
        const newBooking = new Reservation({
            name: name,
            phone: phone,
            vName: vName,
            count: count,
            noDays: noDays
        });
        await newBooking.save();
        res.json({ error: false, newBooking });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, phone, vName, count, noDays } = req.body;
        const updatedBooking = await Reservation.findByIdAndUpdate(id, {
            name: name,
            phone: phone,
            vName: vName,
            count: count,
            noDays: noDays
        }, { new: true });
        res.json({ error: false, updatedBooking });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Reservation.findByIdAndDelete(id);
        res.json({ error: false });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log("Server is running on port:", port);
});
