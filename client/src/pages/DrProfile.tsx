import { DoctorData } from "../interfaces/DoctorData";
import React, { useEffect, useState} from "react";


interface DoctorProfileProps {
    doctor: DoctorData;
  }
  
const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor: initialDoctor }) => {
  const [thisDoctor, setThisDoctor] = useState<DoctorData | null>(initialDoctor);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchDoctorData = async () => {
          try {
              const response = await fetch("/api/doctors/me", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${localStorage.getItem("token")}`,  // Assuming token-based auth
                      "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch doctor data");
                }

                const data: DoctorData = await response.json();
                setThisDoctor(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorData();
    }, []);
    if (loading) return <p>Loading doctor profile...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!thisDoctor) return <p>No doctor data available.</p>;

return (
      <div>
        <h2>Doctor Profile</h2>
        <div>
          <p><strong>ID:</strong> {thisDoctor.dr_id ?? "N/A"}</p>
          <p><strong>Name:</strong> {thisDoctor.dr_name ?? "N/A"}</p>
          <p><strong>Email:</strong> {thisDoctor.email ?? "N/A"}</p>
          <p><strong>Specialization:</strong> {thisDoctor.specialization ?? "N/A"}</p>
        </div>
  
        <div>
          <h3>Patients Assigned</h3>
          {thisDoctor.patient_id && thisDoctor.patient_id.length > 0 ? (
            <ul>
              {thisDoctor.patient_id.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ul>
          ) : (
            <p>No patients assigned.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default DoctorProfile;