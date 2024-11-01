// src/services/subjectRelationshipService.ts

import { status } from '@grpc/grpc-js';
import SubjectsRelationships from '#models/subjectRelationshipModel.js';
import catchAsync from '#utils/catchAsync.js';
import AppError from '#utils/appErrors.js';

export const createSubjectRelationship = catchAsync(async (call, callback) => {
  const { subjectCode, preSubjectCode } = call.request;

  if (!subjectCode || !preSubjectCode) {
    throw new AppError('Datos ingresados no validos', status.INVALID_ARGUMENT);
  }

  const subjectRelationship = await SubjectsRelationships.create({
    subjectCode,
    preSubjectCode,
  });
  return callback(null, subjectRelationship);
});

export const getSubjectRelationship = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subjectRelationship = await SubjectsRelationships.findById(id);

  if (!subjectRelationship) {
    throw new AppError(
      'Relación entre asignaturas no encontrada',
      status.NOT_FOUND,
    );
  }
  return callback(null, subjectRelationship);
});

export const updateSubjectRelationship = catchAsync(async (call, callback) => {
  const { id, subjectCode, preSubjectCode } = call.request;

  const subjectRelationship = await SubjectsRelationships.findByIdAndUpdate(
    id,
    { subjectCode, preSubjectCode },
    { new: true, runValidators: true },
  );

  if (!subjectRelationship) {
    throw new AppError(
      'Relación entre asignaturas no encontrada',
      status.NOT_FOUND,
    );
  }
  return callback(null, subjectRelationship);
});

export const deleteSubjectRelationship = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const subjectRelationship = await SubjectsRelationships.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true, runValidators: true },
  );

  if (!subjectRelationship) {
    throw new AppError(
      'Relación entre asignaturas no encontrada',
      status.NOT_FOUND,
    );
  }
  return callback(null, { success: true });
});

export const getAllSubjectRelationships = catchAsync(async (call, callback) => {
  const subjectRelationships = await SubjectsRelationships.find();
  return callback(null, { subjectRelationships });
});

// Get Post-Requisites Map
export const getPostRequisitesMap = catchAsync(async (call, callback) => {
  const relationshipsList = await SubjectsRelationships.find();

  const postRequisitesMap = {};
  relationshipsList.forEach((sr) => {
    if (postRequisitesMap[sr.preSubjectCode]) {
      postRequisitesMap[sr.preSubjectCode].codes.push(sr.subjectCode);
    } else {
      postRequisitesMap[sr.preSubjectCode] = { codes: [sr.subjectCode] };
    }
  });

  callback(null, { data: postRequisitesMap });
});

// Get Pre-Requisites Map
export const getPreRequisitesMap = catchAsync(async (call, callback) => {
  const relationshipsList = await SubjectsRelationships.find();

  const preRequisitesMap = {};
  relationshipsList.forEach((sr) => {
    if (preRequisitesMap[sr.subjectCode]) {
      preRequisitesMap[sr.subjectCode].codes.push(sr.preSubjectCode);
    } else {
      preRequisitesMap[sr.subjectCode] = { codes: [sr.preSubjectCode] };
    }
  });
  callback(null, { data: preRequisitesMap });
});

export default {
  createSubjectRelationship,
  getSubjectRelationship,
  updateSubjectRelationship,
  deleteSubjectRelationship,
  getAllSubjectRelationships,
  getPostRequisitesMap,
  getPreRequisitesMap,
};
