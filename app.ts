import { Server } from "@grpc/grpc-js";
import { loadProto } from "@/utils/loadProto";
import { CareersService, SubjectsService } from "@/types";
import subjectsService from "@/services/subjectsService";
import careersService from "@/services/careersService";

const careersProto = loadProto("careers") as CareersService;
const subjectsProto = loadProto("subjects") as SubjectsService;

const server = new Server();
server.addService(careersProto.Careers.service, careersService);
server.addService(subjectsProto.Subjects.service, subjectsService);

export default server;
