import { useState, FormEvent, ChangeEvent } from "react";
import DrAuthService from '../utils/doctorAuth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authDoctorAPI";  // Import the login function from the API
// import DoctorAuthService from '../utils/doctorAuth';
// import PatientAuthService from "../utils/patientAuth";
import { DoctorLogin } from "../interfaces/DoctorLogin";  
import { Link, useNavigate } from "react-router-dom";



const DrLogin = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<DoctorLogin>({
    name: '',
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  const navigate = useNavigate();
  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      console.log(data);
      // If login is successful, call Auth.login to store the token in localStorage
      if (data.token) {
        DrAuthService.login(data.token); // Store token
        // localStorage.setItem(data.token); // Store doctorId
        setIsLoggedIn(true);
        // navigate to the doctor profile page
        navigate('/DrProfile');
      } else {
        alert("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='form-container my-5 col-12 col-md-6 mb-4'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='email'
            name='email'
            value={loginData.email || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
      </form>
      {isLoggedIn && ( 
        <div>
          <p>Login successful! Click below to continue:</p>
          <Link to="/DrProfile" className="btn btn-success">Go to Profile</Link>
        </div>
      )}

      <div> <h1>Not yet a member? Signup Here</h1>
  
  <Link to="/DoctorSignup" className="btn btn-primary">
  Doctor Signup
</Link>
        </div>
    </div>
  )
};

export default DrLogin;
