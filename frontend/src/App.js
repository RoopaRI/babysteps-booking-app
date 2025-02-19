import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Appointment Booking App</h1>
        <p>Backend Message: {message}</p>
      </header>
    </div>
  );
}

export default App;
