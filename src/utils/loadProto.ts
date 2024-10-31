import path from "path";
import { loadPackageDefinition, GrpcObject } from "@grpc/grpc-js";
import { loadSync, PackageDefinition } from "@grpc/proto-loader";

export const loadProto = (filename: string): GrpcObject => {
  const protoPath = path.join(__dirname, "../protos", `${filename}.proto`);
  const packageDefinition: PackageDefinition = loadSync(protoPath);
  return loadPackageDefinition(packageDefinition);
};
