import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorAuthService from '../utils/doctorAuth';
import PatientAuthService from '../utils/patientAuth';
const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (DoctorAuthService.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if doctor is logged in
    } else if (PatientAuthService.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if patient is logged in
    } else {
      setLoginCheck(false);  // Set loginCheck to false if no user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      <h1>
        Authentication Review
      </h1>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            <>
              {/* Render sign up button if patient is not logged in */}
              <button className="btn" type='button'>
                <Link to='/PatientSignup'>Patient Sign Up</Link>
              </button>
              {' '}
              {/* Render login button if patient is not logged in */}
              <button className="btn" type='button'>
                <Link to='/PatientLogin'>Patient Login</Link>
              </button>
              {/* Render sign up button if doctor is not logged in */}
              <button className="btn" type='button'>
                <Link to='/DoctorSignup'>Doctor Sign Up</Link>
              </button>
              {' '}
              {/* Render login button if doctor is not logged in */}
              <button className="btn" type='button'>
                <Link to='/DoctorLogin'>Doctor Login</Link>
              </button>
            </>
          ) : (
            // Render logout button if user is logged in
            <button className="btn" type='button' onClick={() => {
              if (DoctorAuthService.loggedIn()) {
                DoctorAuthService.logout();  // Call logout() method from auth utility on button click
              } else if (PatientAuthService.loggedIn()) {
                PatientAuthService.logout();  // Call logout() method from auth utility on button click
              }
              setLoginCheck(false);  // Set loginCheck state to false on button click
            }}>Logout</button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;
