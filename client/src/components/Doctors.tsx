import React from 'react';

import type { DoctorData } from "../interfaces/DoctorData";

// Define the props for the component
interface DoctorListProps {
    doctors: DoctorData[] | null; // doctors can be an array of DoctorData objects or null
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
    return (
        <>
            <h2 className="pb-5">
            Doctors on Staff
            </h2>
            {doctors && doctors.map((doctor: DoctorData) => (
            <div className="row align-center mb-5" key={doctor.dr_id}>
                <div className="col-md-6">
                <h3>{doctor.dr_id}. {doctor.dr_name}</h3>
                </div>
                <div className="col-md-6">
                <h4><a href={`mailto:${doctor.email}`}>{doctor.specialization}</a></h4>
                </div>
                <div className="col-md-6">
                <h4>Current Patients: {doctor.patient_id}</h4>    
                
                </div>
            </div>
            ))}
        </>
    );
};

export default DoctorList;
