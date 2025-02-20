import React from 'react';

import type { PatientData } from "../interfaces/PatientData";

// Define the props for the component
interface PatientListProps {
    patients: PatientData[] | null; // users can be an array of UserData objects or null
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
    return (
        <>
            <h2 className="pb-5">
                Current Patients
            </h2>
            {patients && patients.map((patient) => (
                <div className="row align-center mb-5" key={patient.patient_id}>
                    <div className="col-md-6">
                        <h3>{patient.patient_id}. {patient.patient_name}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${patient.email}`}>{patient.dr_id}</a></h4>
                    </div>
                    <div className="col-md-6">
                        <h4>{patient.height} in</h4>    
                        <h4>{patient.weight} lbs</h4>
                        <h4>{patient.age} years</h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PatientList;
