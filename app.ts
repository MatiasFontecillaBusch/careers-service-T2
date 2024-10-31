import { Server } from "@grpc/grpc-js";
import { loadProto } from "@/utils/loadProto";
import {
  CareersService,
  SubjectRelationshipsService,
  SubjectsService,
} from "@/types";
import subjectsService from "@/services/subjectsService";
import careersService from "@/services/careersService";
import subjectRelationshipService from "@/services/subjectRelationshipService";

const server = new Server();

const careersProto = loadProto("careers") as CareersService;
server.addService(careersProto.Careers.service, careersService);

const subjectsProto = loadProto("subjects") as SubjectsService;
server.addService(subjectsProto.Subjects.service, subjectsService);

const subjectRelationshipsProto = loadProto(
  "subjectRelationships"
) as SubjectRelationshipsService;
server.addService(
  subjectRelationshipsProto.SubjectRelationships.service,
  subjectRelationshipService
);

export default server;
