import { Router, Request, Response } from 'express';
import { Dr } from '../models/Doctors.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a doctor
export const doctorLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;  // Extract username and password from request body
  console.log (req.body);
  // Find the doctor in the database by username
  const doctor = await Dr.findOne({
    where: { email },
  });

  // If doctor is not found, send an authentication failed response
  if (!doctor) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  console.log(doctor.password);
  // Compare the provided password with the stored hashed password
  const doctorPasswordIsValid = await bcrypt.compare(password, doctor.password);
  // If password is invalid, send an authentication failed response
  if (!doctorPasswordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';
  
  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  console.log(token);
  return res.json({ token });  // Send the token as a JSON response
};
export const doctorSignUp = async (req: Request, res: Response) => {
  try {
    const { dr_name,email, password } = req.body;
    const newDr = await Dr.create({ dr_name,email, password });

    console.log(newDr);
    
      // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: newDr.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
    // res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Create a new router instance for doctor
const drAuthRouter = Router();

// POST /login - Login a doctor
drAuthRouter.post('/doctorLogin', doctorLogin);  // Define the login route

// POST /users - Create a new doctor
drAuthRouter.post('/doctorSignup', doctorSignUp);

export default drAuthRouter;  // Export the router instance
