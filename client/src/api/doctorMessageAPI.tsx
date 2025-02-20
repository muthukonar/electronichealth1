import { useEffect, useState } from "react";
import { ApiMessage } from "../interfaces/ApiMessage";

interface Patient {
  id: number;
  name: string;
}

const DoctorDropdown: React.FC = () => {
  const doctorId = localStorage.getItem("doctorId");
  const [selectedNote, setSelectedNote] = useState<string> ("");
  const [selectedPatient, setSelectedPatient] = useState<string> ("");
  const [patients, setPatients] = useState<Patient[]>([]);
  
  const [apiData, setApiData] = useState<ApiMessage | null>(null);

  // Fetch patients for this doctor
  useEffect(() => {
    if (!doctorId) return;
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/patients/${doctorId}`);
        const result = await response.json();
        setPatients(result);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [doctorId]);

const handleChoose = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  const noteChoice = event.target.value;
  setSelectedNote(noteChoice);

if (noteChoice) {
  try {
    const response = await fetch ('https://odphp.health.gov/myhealthfinder/api/v3/itemlist.json?TopicID=${value}');
    const result = await response.json();
    setApiData(result);
  } catch (error) {
    console.error('Error:', error);
  }
}
};

const handleSendNote = async () => {
  if (!selectedNote || !selectedPatient) {
    alert('Please select a note and patient to send the note to!');
    return;
  }

  try {
    const response = await fetch("https://localhost:3000/api/send-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          patientId: selectedPatient,
          noteId: selectedNote,
          noteText: apiData?.Result?.Resources?.[0]?.Title || "Unknown Note",
        }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
  }
};

return (
  <div>
    <h2>Select a Health Topic</h2>
    <select value={selectedNote} onChange={handleChoose}>
      <option value="">Select a Note to Send</option>
      <option value="25">Keep Your Heart Healthy</option>
      <option value="531">Get Screened</option>
      <option value="30567">Get Your Annual Medicare Wellness Exam</option>
    </select>

    <h2>Select a Patient</h2>
    <select
      value={selectedPatient}
      onChange={(e) => setSelectedPatient(e.target.value)}
    >
      <option value="">Select a Patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>


    <button onClick={handleSendNote} disabled={!selectedNote || !selectedPatient}>
      Send Note to Patient
    </button>

    {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}
  </div>
);
};

export default DoctorDropdown;

