// src/services/subjectRelationshipService.ts

import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import SubjectsRelationships, {
  SubjectsRelationship,
} from "@/models/subjectRelationshipModel";
import catchAsync from "@/utils/catchAsync";
import AppError from "@/utils/appErrors";

export const createSubjectRelationship = catchAsync(
  async (
    call: ServerUnaryCall<
      { subjectCode: string; preSubjectCode: string },
      unknown
    >,
    callback: sendUnaryData<SubjectsRelationship>
  ) => {
    const { subjectCode, preSubjectCode } = call.request;

    if (!subjectCode || !preSubjectCode) {
      throw new AppError(
        "Datos ingresados no validos",
        status.INVALID_ARGUMENT
      );
    }

    const subjectRelationship = await SubjectsRelationships.create({
      subjectCode,
      preSubjectCode,
    });
    return callback(null, subjectRelationship);
  }
);

export const getSubjectRelationship = catchAsync(
  async (
    call: ServerUnaryCall<{ id: string }, unknown>,
    callback: sendUnaryData<SubjectsRelationship>
  ) => {
    const { id } = call.request;
    const subjectRelationship = await SubjectsRelationships.findById(id);

    if (!subjectRelationship) {
      throw new AppError("Relación entre asignaturas no encontrada", status.NOT_FOUND);
    }
    return callback(null, subjectRelationship);
  }
);

export const updateSubjectRelationship = catchAsync(
  async (
    call: ServerUnaryCall<
      { id: string; subjectCode: string; preSubjectCode: string },
      unknown
    >,
    callback: sendUnaryData<SubjectsRelationship>
  ) => {
    const { id, subjectCode, preSubjectCode } = call.request;

    const subjectRelationship = await SubjectsRelationships.findByIdAndUpdate(
      id,
      { subjectCode, preSubjectCode },
      { new: true, runValidators: true }
    );

    if (!subjectRelationship) {
      throw new AppError(
        "Relación entre asignaturas no encontrada",
        status.NOT_FOUND
      );
    }
    return callback(null, subjectRelationship);
  }
);

export const deleteSubjectRelationship = catchAsync(
  async (
    call: ServerUnaryCall<{ id: string }, unknown>,
    callback: sendUnaryData<{ success: boolean }>
  ) => {
    const { id } = call.request;
    const subjectRelationship = await SubjectsRelationships.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!subjectRelationship) {
      throw new AppError(
        "Relación entre asignaturas no encontrada",
        status.NOT_FOUND
      );
    }
    return callback(null, { success: true });
  }
);

export const getAllSubjectRelationships = catchAsync(
  async (
    call: ServerUnaryCall<{}, unknown>,
    callback: sendUnaryData<{ subjectRelationships: SubjectsRelationship[] }>
  ) => {
    const subjectRelationships = await SubjectsRelationships.find();
    return callback(null, { subjectRelationships });
  }
);

export default {
  createSubjectRelationship,
  getSubjectRelationship,
  updateSubjectRelationship,
  deleteSubjectRelationship,
  getAllSubjectRelationships,
};
