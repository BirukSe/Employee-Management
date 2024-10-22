import React, { useState, useEffect } from 'react';
import './Account.css';

function Account() {
    const [employees, setEmployees] = useState([]); // State to hold all employees
    const [error, setError] = useState('');

    // Fetch all employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://employeebackend-154t.onrender.com/employee');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const result = await response.json();
                setEmployees(result);
            } catch (err) {
                setError(err.message);
                console.log(err);
            }
        };
        fetchEmployees();
    }, []);

    const handleEdit = async (id, updatedEmployee) => {
        try {
            const response = await fetch(`https://employeebackend-154t.onrender.com/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (!response.ok) {
                throw new Error('Failed to update employee');
            }

            const updatedData = await response.json();
            setEmployees((prev) =>
                prev.map((employee) =>
                    employee._id === updatedData._id ? updatedData : employee
                )
            );
            alert('Employee updated successfully');
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (id, field, value) => {
        setEmployees((prev) =>
            prev.map((employee) =>
                employee._id === id ? { ...employee, [field]: value } : employee
            )
        );
    };

    if (error) return <div>Error: {error}</div>;
    if (!employees.length) return <div>Loading...</div>;

    return (
        <div className="contain">
            <h1>Edit Employees</h1>
            {employees.map((employee) => (
                <div key={employee._id} className="card">
                    <input
                        name="name"
                        value={employee.name}
                        onChange={(e) => handleChange(employee._id, 'name', e.target.value)}
                    />
                    <input
                        name="position"
                        value={employee.position}
                        onChange={(e) => handleChange(employee._id, 'position', e.target.value)}
                    />
                    <input
                        name="department"
                        value={employee.department}
                        onChange={(e) => handleChange(employee._id, 'department', e.target.value)}
                    />
                    <input
                        name="email"
                        value={employee.email}
                        onChange={(e) => handleChange(employee._id, 'email', e.target.value)}
                    />
                    <button onClick={() => handleEdit(employee._id, employee)}>Edit Employee Data</button>
                </div>
            ))}
        </div>
    );
}

export default Account;
