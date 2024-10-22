import React, { useEffect, useState } from 'react';
import './Profile.css';
import teamImage from '../../assets/team1.jpeg';
import productivityImage from '../../assets/productivity.jpeg';

function Profile() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://employeebackend-154t.onrender.com/employee");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data); // Assuming data is an array of employees
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <div className="news">
        <div className="bura">
          <h1>Employees</h1>
        </div>
        {error && <div className="error">{error}</div>}
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div className="card" key={employee._id}>
              <h1>{employee.name}</h1>
              <h2 className="card-title">{employee.position}</h2>
              <p className="card-text">{employee.department}</p>
              <p>{employee.email}</p>
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 StaffSphere. All rights reserved.</p>
        <p>Contact us: support@staffsphere.com</p>
      </footer>
    </div>
  );
}

export default Profile;
