const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    workingHours: { start: String, end: String },
    specialization: String,
    image: String,
    interval: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model("Doctor", doctorSchema);
