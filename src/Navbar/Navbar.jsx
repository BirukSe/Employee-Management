import React from 'react'; // Corrected capitalization
import { Link } from 'react-router-dom'; // Import Link
import './Navbar.css';

function Navbar() {
    return (
        <div className="sidebar">
            <div className="shortcut-links">
                <Link to="/profile">Home</Link>
                <Link to="/news">News</Link>
                <Link to="/payment">Add Employees</Link>
                <Link to="/account">Edit Employee Info</Link>
                <Link to="/delete">Delete Employee</Link>
            </div>
        </div>
    );
}

export default Navbar;
