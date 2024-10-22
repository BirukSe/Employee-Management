// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Signup from './Pages/Signup/Signup';
// import Login from './Pages/Login/Login';
// import Profile from './Pages/Profile/Profile';
// import Navbar from './Navbar/Navbar';
// import React, { useState } from 'react';



// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const handleAuthenticate = () => {
//     setIsAuthenticated(true); // Store the actual username
// };
//   return (
//     <>
//    <Router>
//    {isAuthenticated && <Navbar />}
//     <Routes>
//       <Route path='/' element={<Signup onAuthenticate={handleAuthenticate}/>}/>
//       <Route path="/login" element={<Login onAuthenticate={handleAuthenticate}/>}/>
//       <Route path="/profile" element={<Profile/>}/>
//     </Routes>
//    </Router>
//    </>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Signup from './Pages/Signup/Signup';
// import Login from './Pages/Login/Login';
// import Profile from './Pages/Profile/Profile';
// import Navbar from './Navbar/Navbar';
// import Payment from './Pages/Payment/Payment';
// import Account from './Pages/Account/Account';
// import News from './Pages/News/News';

// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const handleAuthenticate = (username) => {
//         setIsAuthenticated(true);
//         // Optionally store username or other user info
//     };

//     const handleLogout = () => {
//         setIsAuthenticated(false);
//     };

//     return (
//         <Router>
//             {/* Show Navbar only if authenticated and not on Login or Signup pages */}
//             {isAuthenticated && <Navbar onLogout={handleLogout} />}
//             <Routes>
//                 <Route path='/' element={<Signup onAuthenticate={handleAuthenticate} />} />
//                 <Route path="/login" element={<Login onAuthenticate={handleAuthenticate} />} />
//                 <Route path="/profile" element={<Profile />} />
//                <Route path="/news" element={isAuthenticated ? <News/>:<Login/>}/>
//                <Route path="/payment" element={<Payment/>}/>
//                <Route path="/account" element={<Account/>}/>
//             </Routes>
//         </Router>
//     );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Navbar from './Navbar/Navbar';
import Payment from './Pages/Payment/Payment';
import Account from './Pages/Account/Account';
import News from './Pages/News/News';
import Delete from './Pages/Delete/Delete';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthenticate = (username) => {
        setIsAuthenticated(true);
        // Optionally store username or other user info
        // Redirect to a desired route after authentication
        // e.g., <Navigate to="/profile" />
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {/* Show Navbar only if authenticated */}
            {isAuthenticated && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route path='/' element={<Signup onAuthenticate={handleAuthenticate} />} />
                <Route path="/login" element={<Login onAuthenticate={handleAuthenticate} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} isAuthenticated={isAuthenticated} />} />
                <Route path="/news" element={<ProtectedRoute element={<News />} isAuthenticated={isAuthenticated} />} />
                <Route path="/payment" element={<ProtectedRoute element={<Payment />} isAuthenticated={isAuthenticated} />} />
                <Route path="/account" element={<ProtectedRoute element={<Account />} isAuthenticated={isAuthenticated} />} />
                <Route path="/delete" element={<ProtectedRoute element={<Delete/>} isAuthenticated={isAuthenticated}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
