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
