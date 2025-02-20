require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
  
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const seedDatabase = async () => {
    await Doctor.deleteMany();
    await Appointment.deleteMany();
  
    const doctors = await Doctor.insertMany([
        { 
            "name": "Dr. Alice Johnson", 
            "workingHours": { "start": "09:00", "end": "17:00" }, 
            "specialization": "Gynecologist",
            "image": "https://images.pexels.com/photos/3985166/pexels-photo-3985166.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. Brian Smith", 
            "workingHours": { "start": "08:00", "end": "16:00" }, 
            "specialization": "Pediatrician",
            "image": "https://images.pexels.com/photos/8376227/pexels-photo-8376227.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. Catherine Lee", 
            "workingHours": { "start": "10:00", "end": "18:00" }, 
            "specialization": "Cardiologist",
            "image": "https://images.pexels.com/photos/5452238/pexels-photo-5452238.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. Daniel Brown", 
            "workingHours": { "start": "07:30", "end": "15:30" }, 
            "specialization": "Dermatologist",
            "image": "https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. Emily Davis", 
            "workingHours": { "start": "08:30", "end": "16:30" }, 
            "specialization": "Neurologist",
            "image": "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. Frank White", 
            "workingHours": { "start": "09:00", "end": "17:00" }, 
            "specialization": "Orthopedic Surgeon",
            "image": "https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg",
            "interval": 30
          },
          { 
            "name": "Dr. George Miller", 
            "workingHours": { "start": "10:00", "end": "18:00" }, 
            "specialization": "ENT Specialist",
            "image": "https://images.pexels.com/photos/5327582/pexels-photo-5327582.jpeg",
            "interval": 30
          },
        { 
          "name": "Dr. Hannah Wilson", 
          "workingHours": { "start": "07:30", "end": "15:30" }, 
          "specialization": "General Physician",
          "image": "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Isaac Taylor", 
          "workingHours": { "start": "08:00", "end": "16:00" }, 
          "specialization": "Psychiatrist",
          "image": "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Julia Martinez", 
          "workingHours": { "start": "09:30", "end": "17:30" }, 
          "specialization": "Pediatrician",
          "image": "https://images.pexels.com/photos/8376229/pexels-photo-8376229.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Kevin Anderson", 
          "workingHours": { "start": "07:00", "end": "15:00" }, 
          "specialization": "Cardiologist",
          "image": "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Linda Harris", 
          "workingHours": { "start": "10:30", "end": "18:30" }, 
          "specialization": "Gynecologist",
          "image": "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Michael Clark", 
          "workingHours": { "start": "08:00", "end": "16:00" }, 
          "specialization": "Dermatologist",
          "image": "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Nancy Lewis", 
          "workingHours": { "start": "07:30", "end": "15:30" }, 
          "specialization": "Endocrinologist",
          "image": "https://images.pexels.com/photos/5452238/pexels-photo-5452238.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Oliver Scott", 
          "workingHours": { "start": "09:00", "end": "17:00" }, 
          "specialization": "Ophthalmologist",
          "image": "https://images.pexels.com/photos/8376227/pexels-photo-8376227.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Patricia Adams", 
          "workingHours": { "start": "08:30", "end": "16:30" }, 
          "specialization": "Nephrologist",
          "image": "https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Quentin Evans", 
          "workingHours": { "start": "07:00", "end": "15:00" }, 
          "specialization": "Pulmonologist",
          "image": "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Rachel King", 
          "workingHours": { "start": "10:00", "end": "18:00" }, 
          "specialization": "Oncologist",
          "image": "https://images.pexels.com/photos/3985166/pexels-photo-3985166.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Samuel Baker", 
          "workingHours": { "start": "08:00", "end": "16:00" }, 
          "specialization": "Rheumatologist",
          "image": "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
          "interval": 30
        },
        { 
          "name": "Dr. Teresa Foster", 
          "workingHours": { "start": "09:30", "end": "17:30" }, 
          "specialization": "Urologist",
          "image": "https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg",
          "interval": 30
        }
    ]);
  
    // const { ObjectId } = require('mongoose').Types;

    // await Appointment.insertMany([
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f90"),
    //       "date": new Date("2025-02-20T10:00:00Z"),
    //       "duration": 30,
    //       "appointmentType": "Routine Check-Up",
    //       "patientName": "John Doe",
    //       "notes": "First-time consultation"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f91"),
    //       "date": new Date("2025-02-20T11:00:00Z"),
    //       "duration": 60,
    //       "appointmentType": "Ultrasound",
    //       "patientName": "Jane Smith",
    //       "notes": ""
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f92"),
    //       "date": new Date("2025-02-21T09:00:00Z"),
    //       "duration": 45,
    //       "appointmentType": "Heart Consultation",
    //       "patientName": "Michael Johnson",
    //       "notes": "Follow-up on heart condition"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f93"),
    //       "date": new Date("2025-02-21T14:00:00Z"),
    //       "duration": 30,
    //       "appointmentType": "Skin Check",
    //       "patientName": "Emily White",
    //       "notes": "Rash evaluation"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f94"),
    //       "date": new Date("2025-02-22T10:30:00Z"),
    //       "duration": 60,
    //       "appointmentType": "Neurology Consultation",
    //       "patientName": "David Brown",
    //       "notes": "Severe headaches"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f95"),
    //       "date": new Date("2025-02-23T13:00:00Z"),
    //       "duration": 45,
    //       "appointmentType": "Orthopedic Examination",
    //       "patientName": "Sophia Green",
    //       "notes": "Knee pain assessment"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f96"),
    //       "date": new Date("2025-02-23T16:00:00Z"),
    //       "duration": 30,
    //       "appointmentType": "ENT Checkup",
    //       "patientName": "Oliver Adams",
    //       "notes": "Hearing issues"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f97"),
    //       "date": new Date("2025-02-24T08:00:00Z"),
    //       "duration": 30,
    //       "appointmentType": "General Check-Up",
    //       "patientName": "Emma Wilson",
    //       "notes": "Routine visit"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f98"),
    //       "date": new Date("2025-02-24T10:30:00Z"),
    //       "duration": 60,
    //       "appointmentType": "Psychiatric Evaluation",
    //       "patientName": "Noah Taylor",
    //       "notes": "Depression treatment"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f99"),
    //       "date": new Date("2025-02-25T09:00:00Z"),
    //       "duration": 45,
    //       "appointmentType": "Pediatric Consultation",
    //       "patientName": "Liam Martinez",
    //       "notes": "Fever and cold"
    //     },
    //     {
    //       "doctorId": new ObjectId("67b5d521ac500519fafe1f9a"),
    //       "date": new Date("2025-02-25T14:30:00Z"),
    //       "duration": 60,
    //       "appointmentType": "Heart Screening",
    //       "patientName": "Ava Anderson",
    //       "notes": "High blood pressure"
    //     }
      
      
    // ]);
  
    console.log("Database seeded!");
    mongoose.connection.close();
  };
  
  seedDatabase();
