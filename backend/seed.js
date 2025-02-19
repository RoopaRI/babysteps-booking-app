require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI + "bookings"; // Append database name

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

const doctorSchema = new mongoose.Schema({
  name: String,
  workingHours: { start: String, end: String },
  specialization: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

const doctors = [
  { "name": "Dr. Alice Johnson", "workingHours": { "start": "09:00", "end": "17:00" }, "specialization": "Gynecologist" },
  { "name": "Dr. Brian Smith", "workingHours": { "start": "08:00", "end": "16:00" }, "specialization": "Pediatrician" },
  { "name": "Dr. Catherine Lee", "workingHours": { "start": "10:00", "end": "18:00" }, "specialization": "Cardiologist" },
  { "name": "Dr. Daniel Brown", "workingHours": { "start": "07:30", "end": "15:30" }, "specialization": "Dermatologist" },
  { "name": "Dr. Emily Davis", "workingHours": { "start": "08:30", "end": "16:30" }, "specialization": "Neurologist" },
  { "name": "Dr. Frank White", "workingHours": { "start": "09:00", "end": "17:00" }, "specialization": "Orthopedic Surgeon" },
  { "name": "Dr. George Miller", "workingHours": { "start": "10:00", "end": "18:00" }, "specialization": "ENT Specialist" },
  { "name": "Dr. Hannah Wilson", "workingHours": { "start": "07:30", "end": "15:30" }, "specialization": "General Physician" },
  { "name": "Dr. Isaac Taylor", "workingHours": { "start": "08:00", "end": "16:00" }, "specialization": "Psychiatrist" },
  { "name": "Dr. Julia Martinez", "workingHours": { "start": "09:30", "end": "17:30" }, "specialization": "Pediatrician" },
  { "name": "Dr. Kevin Anderson", "workingHours": { "start": "07:00", "end": "15:00" }, "specialization": "Cardiologist" },
  { "name": "Dr. Linda Harris", "workingHours": { "start": "10:30", "end": "18:30" }, "specialization": "Gynecologist" },
  { "name": "Dr. Michael Clark", "workingHours": { "start": "08:00", "end": "16:00" }, "specialization": "Dermatologist" },
  { "name": "Dr. Nancy Lewis", "workingHours": { "start": "07:30", "end": "15:30" }, "specialization": "Endocrinologist" },
  { "name": "Dr. Oliver Scott", "workingHours": { "start": "09:00", "end": "17:00" }, "specialization": "Ophthalmologist" },
  { "name": "Dr. Patricia Adams", "workingHours": { "start": "08:30", "end": "16:30" }, "specialization": "Nephrologist" },
  { "name": "Dr. Quentin Evans", "workingHours": { "start": "07:00", "end": "15:00" }, "specialization": "Pulmonologist" },
  { "name": "Dr. Rachel King", "workingHours": { "start": "10:00", "end": "18:00" }, "specialization": "Oncologist" },
  { "name": "Dr. Samuel Baker", "workingHours": { "start": "08:00", "end": "16:00" }, "specialization": "Rheumatologist" },
  { "name": "Dr. Teresa Foster", "workingHours": { "start": "09:30", "end": "17:30" }, "specialization": "Urologist" }
];

Doctor.insertMany(doctors)
  .then(() => {
    console.log("Doctors inserted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => console.error("Error inserting doctors:", error));
