import { Server } from "@grpc/grpc-js";
import { loadProto } from "@/utils/loadProto";
import {
  createCareer,
  deleteCareer,
  getAllCareers,
  getCareer,
  updateCareer,
} from "@/services/careersService";
import { CareersService, SubjectsService } from "@/types";
import subjectsService from "@/services/subjectsService";

const careersProto = loadProto("careers") as CareersService;
const subjectsProto = loadProto("subjects") as SubjectsService;

const server = new Server();
server.addService(careersProto.Careers.service, {
  createCareer,
  getCareer,
  updateCareer,
  deleteCareer,
  getAllCareers,
});
server.addService(subjectsProto.Subjects.service, subjectsService);

export default server;
