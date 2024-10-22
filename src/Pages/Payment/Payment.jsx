import React, { useState } from 'react';
import './Payment.css';

function Payment() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [resultMessage, setResultMessage] = useState(""); // State for result message

    const handleIt = async () => {
        try {
            const response = await fetch("https://employeebackend-154t.onrender.com/employee/", {
                method: "POST",
                headers: { // Use 'headers' instead of 'header'
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, position, department, email }),
            });

            if (!response.ok) {
                setResultMessage("There was an error adding the Employee");
                return; // Exit if there was an error
            }

            // Wait for JSON response
            const result = await response.json();
            setResultMessage("Employee Added Successfully");

        } catch (err) {
            console.log(err);
            setResultMessage("There was an error adding the Employee");
        }
    };

    return (
        <div className="adder">
            <h1>Add Employees</h1>
            <input 
                type="text" 
                placeholder="Name..." 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Position..."
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Department..."
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="Email Addr..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleIt} className="btn">Add Employee</button>
            <h1>{resultMessage}</h1> {/* Display result message */}
        </div>
    );
}

export default Payment;
