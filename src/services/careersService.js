import { status } from '@grpc/grpc-js';
import Careers from '#models/careerModel.js';
import AppError from '#utils/appErrors.js';
import catchAsync from '#utils/catchAsync.js';

const createCareer = catchAsync(async (call, callback) => {
  const { name } = call.request;
  if (!name) {
    throw new AppError(
      'Nombre de la carrera no recibido',
      status.INVALID_ARGUMENT,
    );
  }
  const career = await Careers.create({ name });
  return callback(null, career);
});

const getCareer = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const career = await Careers.findById(id);

  if (!career) {
    throw new AppError('Carrera no encontrada', status.NOT_FOUND);
  }
  return callback(null, career);
});

const updateCareer = catchAsync(async (call, callback) => {
  const { id, name } = call.request;
  if (!name) {
    throw new AppError(
      'El nombre de la carrera es necesario para actualizarla',
      status.INVALID_ARGUMENT,
    );
  }

  const career = await Careers.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true },
  );

  if (!career) {
    throw new AppError('Carrera no encontrada', status.NOT_FOUND);
  }
  return callback(null, career);
});

const deleteCareer = catchAsync(async (call, callback) => {
  const { id } = call.request;
  const career = await Careers.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true, runValidators: true },
  );

  if (!career) {
    throw new AppError('Carrera no encontrada', status.NOT_FOUND);
  }
  return callback(null, { success: true });
});

const getAllCareers = catchAsync(async (call, callback) => {
  const careers = await Careers.find();
  return callback(null, { careers });
});

export default {
  createCareer,
  deleteCareer,
  getAllCareers,
  getCareer,
  updateCareer,
};
