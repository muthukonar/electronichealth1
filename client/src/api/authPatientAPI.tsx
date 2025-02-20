import { PatientLogin } from "../interfaces/PatientLogin";  // Import the PatientLogin interface for typing patientInfo

// Function to send a POST request to the '/auth/login' endpoint with patient login information
const login = async (patientInfo: PatientLogin) => {
  try {
    // Send a POST request to '/auth/login' with patient login information in JSON format
    const response = await fetch('/auth/patient/patientLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientInfo)
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
    console.log('Error from patient login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch patient info');  // Return a rejected promise with an error message
  }
}

const signUp = async (patientInfo: PatientLogin) => {
  try {
    // Send a POST request to '/auth/login' with patient login information in JSON format
    const response = await fetch('/auth/patient/patientSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientInfo)
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
    console.log('Error from patient login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch patient info');  // Return a rejected promise with an error message
  }
}

export { login, signUp };  // Export the login function to be used elsewhere in the application
