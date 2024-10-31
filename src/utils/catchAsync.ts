import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";

type GRPCAsyncHandler<RequestType, ResponseType> = (
  call: ServerUnaryCall<RequestType, unknown>,
  callback: sendUnaryData<ResponseType>
) => Promise<any>;

export default function <RequestType, ResponseType>(
  fn: GRPCAsyncHandler<RequestType, ResponseType>
) {
  return (
    call: ServerUnaryCall<RequestType, unknown>,
    callback: sendUnaryData<ResponseType>
  ) => {
    fn(call, callback).catch((error) => {
      callback({
        code: error.code || 13,
        message: error.message || "Internal server error",
      });
    });
  };
}
