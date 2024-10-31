import { GrpcObject } from "@grpc/grpc-js";

export interface CareersService extends GrpcObject {
  Careers: {
    service: any;
  };
}


export interface SubjectsService extends GrpcObject {
  Subjects: {
    service: any;
  };
}

export interface SubjectRelationshipsService extends GrpcObject {
  SubjectRelationships: {
    service: any;
  };
}

