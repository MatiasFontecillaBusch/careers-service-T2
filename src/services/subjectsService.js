// src/services/subjectService.ts

import { status } from '@grpc/grpc-js';
import Subjects from '#models/subjectModel.js';
import catchAsync from '#utils/catchAsync.js';
import AppError from '#utils/appErrors.js';

const createSubject = catchAsync(async (call, callback) => {
  const { code, name, department, semester } = call.request;

  if (!code || !name || !department || semester < 1) {
    throw new AppError('Datos ingresados no validos', status.INVALID_ARGUMENT);
  }

  const subject = await Subjects.create({ code, name, department, semester });
  return callback(null, subject);
});

const getSubject = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subject = await Subjects.findById(id);

  if (!subject) {
    throw new AppError('Asignatura no encontrada', status.NOT_FOUND);
  }
  return callback(null, subject);
});

// Update a Subject by ID
const updateSubject = catchAsync(async (call, callback) => {
  const { id, code, name, department, semester } = call.request;

  const subject = await Subjects.findByIdAndUpdate(
    id,
    { code, name, department, semester },
    { new: true, runValidators: true },
  );

  if (!subject) {
    throw new AppError('Asignatura no encontrada', status.NOT_FOUND);
  }
  return callback(null, subject);
});

// Delete a Subject by ID
const deleteSubject = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subject = await Subjects.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true, runValidators: true },
  );

  if (!subject) {
    throw new AppError('Asignatura no encontrada', status.NOT_FOUND);
  }
  return callback(null, { success: true });
});

// Get all Subjects
const getAllSubjects = catchAsync(async (call, callback) => {
  const subjects = await Subjects.find();
  return callback(null, { subjects });
});

export default {
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
};
