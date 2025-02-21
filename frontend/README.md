# 📌 Doctor Appointment Booking App  

This is a **Doctor Appointment Booking App** built with:  

- **Frontend**: React.js (Bootstrap for UI)  
- **Backend**: Node.js, Express, MongoDB (Mongoose ORM)  
- **Database**: MongoDB Atlas (or local MongoDB)  
- **Real-time Availability**: Ensures time slot conflicts are handled properly.  

---

## ✅ Features  
Users can:  
✔️ View doctors' availability  
✔️ Select a time slot & book an appointment  
✔️ Edit or cancel existing appointments  

---

# 🚀 Installation & Setup  

## 1️⃣ Prerequisites  
Before you start, ensure you have:  

- **Node.js** (v16+ recommended)  
- **MongoDB** (Local/Atlas)  
- **VS Code** or any code editor  
- **Postman** *(Optional for API testing)*  

---

## 🏗 Backend Setup  

### 🔹 Clone Repository & Install Dependencies  
```sh
git clone https://github.com/your-repo.git
cd backend
npm install

🔹 Configure .env File
Create a .env file in the backend folder and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
🔹 Run Backend Server
sh
Copy
Edit
node server.js
# or
npm run dev
✅ Backend will run at: http://localhost:5000/

🎨 Frontend Setup
🔹 Navigate to Frontend & Install Dependencies
sh
Copy
Edit
cd frontend
npm install
🔹 Run Frontend
sh
Copy
Edit
npm start
✅ Frontend will run at: http://localhost:3000/

📌 API Endpoints
🔹 Doctors API
Method	Endpoint	Description
GET	/doctors	Fetch all doctors
GET	/doctors/:id/slots?date=YYYY-MM-DD	Get available slots for a doctor
🔹 Appointments API
Method	Endpoint	Description
GET	/appointments	Fetch all appointments
POST	/appointments	Book an appointment
PUT	/appointments/:id	Update appointment (date/time)
DELETE	/appointments/:id	Cancel an appointment
⚡ Assumptions & Design Decisions
1️⃣ Doctor Availability
✔️ Working hours are stored in MongoDB.
✔️ Time slots are generated dynamically based on the doctor’s availability and interval duration.
✔️ Slots get filtered based on existing bookings.

2️⃣ Booking Conflicts
✔️ Before confirming an appointment, the backend checks for overlapping bookings.
✔️ If a time slot is already taken, an error is returned.

3️⃣ Patient Name Validation
✔️ Only alphabets & spaces allowed (no numbers or special characters).

4️⃣ Time Slot Selection
✔️ Users can only pick slots in 30-minute intervals.

5️⃣ Editable Appointments
✔️ Users can update both date & time for existing bookings.

🔥 How to Test the Project?
1️⃣ Run both backend & frontend.
2️⃣ Open http://localhost:3000/ in your browser.
3️⃣ Select a doctor → Choose a date → Pick a time slot → Book appointment.
4️⃣ Try to edit/cancel an existing booking.

markdown
Copy
Edit

---

### 🔹 **Fixes Applied to Your Markdown**
1. **Fixed Code Blocks (` ``` `) Issues**  
   - **All code blocks** now have proper **opening & closing backticks**.
   - **Fixed misplaced horizontal rules (`---`)** inside code blocks.

2. **Fixed API Tables for Readability**  
   - Proper **spacing & formatting** so GitHub renders it correctly.

3. **Ensured Proper Headings and Sectioning**  
   - Used **`###`** for subsections like "Doctor Availability" for **better readability**.

✅ **Now your `README.md` will display correctly on GitHub.**  
Just **copy & paste this corrected version** into your project! 🚀

