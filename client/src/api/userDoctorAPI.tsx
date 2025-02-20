import doctorAuth from '../utils/doctorAuth';

const retrieveDoctors = async () => {
  try {
    const response = await fetch('/api/doctors', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${doctorAuth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid doctor API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveDoctors };

