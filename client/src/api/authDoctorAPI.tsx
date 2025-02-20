import { DoctorLogin } from "../interfaces/DoctorLogin";  // Import the PatientLogin interface for typing doctorInfo

// Function to send a POST request to the '/auth/login' endpoint with doctor login information
const login = async (drInfo: DoctorLogin) => {
  try {
    // Send a POST request to '/auth/login' with doctor login information in JSON format
    const response = await fetch('/auth/doctor/doctorLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(drInfo)
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data;  // Return the data received from the server
  } catch (err) {
    console.log('Error from doctor login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch doctor info');  // Return a rejected promise with an error message
  }
}

const signUp = async (drInfo: DoctorLogin) => {
  try {
    // Send a POST request to '/auth/login' with doctor login information in JSON format
    const response = await fetch('/auth/doctor/doctorSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(drInfo)
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data;  // Return the data received from the server
  } catch (err) {
    console.log('Error from doctor login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch doctor info');  // Return a rejected promise with an error message
  }
}

export { login, signUp };  // Export the login function to be used elsewhere in the application
