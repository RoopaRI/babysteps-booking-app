require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

const doctorSchema = new mongoose.Schema({
  name: String,
  workingHours: { start: String, end: String },
  specialization: String,
  image: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

const doctors = [
    { 
        "name": "Dr. Alice Johnson", 
        "workingHours": { "start": "09:00", "end": "17:00" }, 
        "specialization": "Gynecologist",
        "image": "https://images.pexels.com/photos/3985166/pexels-photo-3985166.jpeg"
      },
      { 
        "name": "Dr. Brian Smith", 
        "workingHours": { "start": "08:00", "end": "16:00" }, 
        "specialization": "Pediatrician",
        "image": "https://images.pexels.com/photos/8376227/pexels-photo-8376227.jpeg"
      },
      { 
        "name": "Dr. Catherine Lee", 
        "workingHours": { "start": "10:00", "end": "18:00" }, 
        "specialization": "Cardiologist",
        "image": "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
      },
      { 
        "name": "Dr. Daniel Brown", 
        "workingHours": { "start": "07:30", "end": "15:30" }, 
        "specialization": "Dermatologist",
        "image": "https://images.pexels.com/photos/8376227/pexels-photo-8376227.jpeg",
      },
      { 
        "name": "Dr. Emily Davis", 
        "workingHours": { "start": "08:30", "end": "16:30" }, 
        "specialization": "Neurologist",
        "image": "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
      },
      { 
        "name": "Dr. Frank White", 
        "workingHours": { "start": "09:00", "end": "17:00" }, 
        "specialization": "Orthopedic Surgeon",
        "image": "https://images.pexels.com/photos/8460153/pexels-photo-8460153.jpeg",
      },
      { 
        "name": "Dr. George Miller", 
        "workingHours": { "start": "10:00", "end": "18:00" }, 
        "specialization": "ENT Specialist",
        "image": "https://images.pexels.com/photos/5327582/pexels-photo-5327582.jpeg",
      },
    { 
      "name": "Dr. Hannah Wilson", 
      "workingHours": { "start": "07:30", "end": "15:30" }, 
      "specialization": "General Physician",
      "image": "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
    },
    { 
      "name": "Dr. Isaac Taylor", 
      "workingHours": { "start": "08:00", "end": "16:00" }, 
      "specialization": "Psychiatrist",
      "image": "https://images.pexels.com/photos/7659576/pexels-photo-7659576.jpeg",
    },
    { 
      "name": "Dr. Julia Martinez", 
      "workingHours": { "start": "09:30", "end": "17:30" }, 
      "specialization": "Pediatrician",
      "image": "https://images.pexels.com/photos/8376229/pexels-photo-8376229.jpeg",
    },
    { 
      "name": "Dr. Kevin Anderson", 
      "workingHours": { "start": "07:00", "end": "15:00" }, 
      "specialization": "Cardiologist",
      "image": "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
    },
    { 
      "name": "Dr. Linda Harris", 
      "workingHours": { "start": "10:30", "end": "18:30" }, 
      "specialization": "Gynecologist",
      "image": "https://images.pexels.com/photos/573306/pexels-photo-573306.jpeg",
    },
    { 
      "name": "Dr. Michael Clark", 
      "workingHours": { "start": "08:00", "end": "16:00" }, 
      "specialization": "Dermatologist",
      "image": "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg",
    },
    { 
      "name": "Dr. Nancy Lewis", 
      "workingHours": { "start": "07:30", "end": "15:30" }, 
      "specialization": "Endocrinologist",
      "image": "https://images.pexels.com/photos/5452238/pexels-photo-5452238.jpeg",
    },
    { 
      "name": "Dr. Oliver Scott", 
      "workingHours": { "start": "09:00", "end": "17:00" }, 
      "specialization": "Ophthalmologist",
      "image": "https://images.pexels.com/photos/6974586/pexels-photo-6974586.jpeg",
    },
    { 
      "name": "Dr. Patricia Adams", 
      "workingHours": { "start": "08:30", "end": "16:30" }, 
      "specialization": "Nephrologist",
      "image": "https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg",
    },
    { 
      "name": "Dr. Quentin Evans", 
      "workingHours": { "start": "07:00", "end": "15:00" }, 
      "specialization": "Pulmonologist",
      "image": "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg",
    },
    { 
      "name": "Dr. Rachel King", 
      "workingHours": { "start": "10:00", "end": "18:00" }, 
      "specialization": "Oncologist",
      "image": "https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg",
    },
    { 
      "name": "Dr. Samuel Baker", 
      "workingHours": { "start": "08:00", "end": "16:00" }, 
      "specialization": "Rheumatologist",
      "image": "https://images.pexels.com/photos/8460149/pexels-photo-8460149.jpeg",
    },
    { 
      "name": "Dr. Teresa Foster", 
      "workingHours": { "start": "09:30", "end": "17:30" }, 
      "specialization": "Urologist",
      "image": "https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg",
    }
  ];
  

  Doctor.deleteMany({})
  .then(() => {
    console.log("Existing doctors deleted.");
    return Doctor.insertMany(doctors);
  })
  .then(() => {
    console.log("Doctors inserted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => console.error("Error inserting doctors:", error));
