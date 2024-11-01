import { Server } from '@grpc/grpc-js';
import { loadProto } from '#utils/loadProto.js';
import subjectsService from '#services/subjectsService.js';
import careersService from '#services/careersService.js';
import subjectRelationshipService from '#services/subjectRelationshipService.js';

const server = new Server();

const careersProto = loadProto('careers');
server.addService(careersProto.Careers.service, careersService);

const subjectsProto = loadProto('subjects');
server.addService(subjectsProto.Subjects.service, subjectsService);

const subjectRelationshipsProto = loadProto('subjectRelationships');
server.addService(
  subjectRelationshipsProto.SubjectRelationships.service,
  subjectRelationshipService,
);

export default server;
