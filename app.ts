import { Server } from "@grpc/grpc-js";
import { loadProto } from "@/utils/loadProto";
import { createCareer } from "@/services/careersService";
import { CareersService } from "@/types";

const careersProto = loadProto("careers") as CareersService;

const server = new Server();
server.addService(careersProto.Careers.service, { createCareer });

export default server;
