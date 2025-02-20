import express from 'express';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { Patient } from '../../models/index.js';
import { formatNotes } from '../../models/Notes.js';

const patientRouter = express.Router();

// GET /patients - Get all patients for a specific doctor
patientRouter.get('/doctor/:doctorId', async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  try {
    const patients = await Patient.findAll({
      where: { dr_id: doctorId },
      attributes: { exclude: ['password'] }
    });
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /patients/:id - Get a patient by id
patientRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /patients/:patient_id - Update a patient by patient_id
patientRouter.put('/:patient_id', async (req: Request, res: Response) => {
  const { patient_id } = req.params;
  const { email, password } = req.body;
  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (email) patient.email = email;
    if (password) {
      patient.password = await bcrypt.hash(password, 10);
    }

    await patient.save();
    res.json(patient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
  return;
});

// DELETE /patients/:patient_id - Delete a patient by patient_id
patientRouter.delete('/:patient_id', async (req: Request, res: Response) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    res.json({ message: 'Patient deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  return;
});

patientRouter.post("/send-note", async (req, res) => {
  const { patientId, noteText } = req.body;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const newNote = await formatNotes({ Title: noteText });
    res.json({ message: 'Note added successfully!', note: newNote });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  return;
});

export { patientRouter as patientRouter };

  