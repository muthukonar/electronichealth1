import sequelize from '../config/connection.js'
import { PatientFactory } from './Patient.js';
import { DrFactory } from './Doctors.js';
// import { fetchNotes } from './Notes.js';


const Dr = DrFactory(sequelize);
const Patient = PatientFactory(sequelize);
// const Note = fetchNotes();

export { Patient, Dr};
