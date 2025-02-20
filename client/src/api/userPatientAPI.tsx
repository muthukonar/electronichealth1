import patientAuth from '../utils/patientAuth';

const retrievePatients = async () => {
  try {
    const response = await fetch('/api/patients', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${patientAuth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid patient API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrievePatients };

