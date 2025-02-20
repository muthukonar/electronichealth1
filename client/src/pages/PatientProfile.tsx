// import {useState, useEffect} from 'react'
// import React from "react";
//  import { PatientData } from "../interfaces/PatientData";
// import patientAuthService from '../utils/patientAuth' 

// // interface PatientProfileProps {
// //   patient: PatientData;
// // }

// const PatientProfile: React.FC = () => {
//   const [patient, setPatient] = useState<PatientData>()

//   const fetchProfile = async () =>{
//     const token = patientAuthService.getProfile()
//     console.log(token)
//     const response = await fetch(`/api/patients/${token.patient_id}`,{
//       headers:{
//         Authorization: `bearer ${patientAuthService.getToken()}`
//       }
//     })
//     const data = await response.json()
//     console.log(data)
//     setPatient(data)

//   }

//   useEffect(() => {
//     fetchProfile()

//   },[])
//   console.log(patient)
//   return (
    
//     <div>
//       {!patient ?<div>loading</div> : (
//      <div> <h2>Patient Profile</h2>
//       <div className="profile-image">
//           {patient.image_url ? (
//             <img
//               src={patient.image_url}
//               alt="Patient Profile"
//               width="150"
//               height="150"
//               style={{ borderRadius: "50%", objectFit: "cover" }}
//             />
//           ) : (
//             <img
//               src="/default-profile.jpg" // Path to a default profile image
//               alt="Default Profile"
//               width="150"
//               height="150"
//               style={{ borderRadius: "50%", objectFit: "cover" }}
//             />
//           )}
//           </div>
//           <div>
//         <p><strong>ID:</strong> {patient.patient_id ?? "N/A"}</p>
//         <p><strong>Name:</strong> {patient.patient_name ?? "N/A"}</p>
//         <p><strong>Email:</strong> {patient.email ?? "N/A"}</p>
//         <p><strong>Height:</strong> {patient.height ? `${patient.height} cm` : "N/A"}</p>
//         <p><strong>Weight:</strong> {patient.weight ? `${patient.weight} kg` : "N/A"}</p>
//         <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
//         <p><strong>Assigned Doctor ID:</strong> {patient.dr_id ?? "N/A"}</p>
//       </div>
//       </div>
//     )}
//     </div>
//   );
// };

// export default PatientProfile;



import { useState, useEffect } from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { PatientData } from "../interfaces/PatientData";
import patientAuthService from '../utils/patientAuth';

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<PatientData>();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = patientAuthService.getProfile();
    console.log(token);
    const response = await fetch(`/api/patients/${token.patient_id}`, {
      headers: {
        Authorization: `Bearer ${patientAuthService.getToken()}`
      }
    });
    const data = await response.json();
    console.log(data);
    setPatient(data);
  };

  const handleLogout = () => {
    patientAuthService.logout(); // Clear authentication token
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {!patient ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Patient Profile</h2>
          <div className="profile-image">
            {patient.image_url ? (
              <img
                src={patient.image_url}
                alt="Patient Profile"
                width="150"
                height="150"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <img
                src="/default-profile.jpg"
                alt="Default Profile"
                width="150"
                height="150"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            <p><strong>ID:</strong> {patient.patient_id ?? "N/A"}</p>
            <p><strong>Name:</strong> {patient.patient_name ?? "N/A"}</p>
            <p><strong>Email:</strong> {patient.email ?? "N/A"}</p>
            <p><strong>Height:</strong> {patient.height ? `${patient.height} cm` : "N/A"}</p>
            <p><strong>Weight:</strong> {patient.weight ? `${patient.weight} kg` : "N/A"}</p>
            <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
            <p><strong>Assigned Doctor ID:</strong> {patient.dr_id ?? "N/A"}</p>
          </div>
          <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
