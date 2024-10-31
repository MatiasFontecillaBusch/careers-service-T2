import Careers, { Career } from "@/models/careerModel";
import AppError from "@/utils/appErrors";
import catchAsync from "@/utils/catchAsync";
import { sendUnaryData, ServerUnaryCall, status } from "@grpc/grpc-js";

export const createCareer = catchAsync(
  async (
    call: ServerUnaryCall<{ name: string }, unknown>,
    callback: sendUnaryData<Career>
  ) => {
    const { name } = call.request;
    if (!name) {
      throw new AppError(
        "Nombre de la carrera no recibido",
        status.INVALID_ARGUMENT
      );
    }
    const career = await Careers.create({ name });
    return callback(null, career);
  }
);

export const getCareer = catchAsync(
  async (
    call: ServerUnaryCall<{ id: string }, unknown>,
    callback: sendUnaryData<Career>
  ) => {
    const { id } = call.request;
    const career = await Careers.findById(id);

    if (!career) {
      throw new AppError("Carrera no encontrada", status.NOT_FOUND);
    }
    return callback(null, career);
  }
);

export const updateCareer = catchAsync(
  async (
    call: ServerUnaryCall<{ id: string; name: string }, unknown>,
    callback: sendUnaryData<Career>
  ) => {
    const { id, name } = call.request;
    if (!name) {
      throw new AppError(
        "El nombre de la carrera es necesario para actualizarla",
        status.INVALID_ARGUMENT
      );
    }

    const career = await Careers.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!career) {
      throw new AppError("Carrera no encontrada", status.NOT_FOUND);
    }
    return callback(null, career);
  }
);

export const deleteCareer = catchAsync(
  async (
    call: ServerUnaryCall<{ id: string }, unknown>,
    callback: sendUnaryData<{ success: boolean }>
  ) => {
    const { id } = call.request;
    const career = await Careers.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!career) {
      throw new AppError("Carrera no encontrada", status.NOT_FOUND);
    }
    return callback(null, { success: true });
  }
);

export const getAllCareers = catchAsync(
  async (
    call: ServerUnaryCall<{}, unknown>,
    callback: sendUnaryData<{ careers: Career[] }>
  ) => {
    const careers = await Careers.find();
    return callback(null, { careers });
  }
);
