import path from 'path';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadProto = (filename) => {
  const protoPath = path.join(__dirname, '../protos', `${filename}.proto`);
  const packageDefinition = loadSync(protoPath);
  return loadPackageDefinition(packageDefinition);
};
