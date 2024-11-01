export default function (fn) {
  return (call, callback) => {
    fn(call, callback).catch((error) => {
      callback({
        code: error.code || 13,
        message: error.message || 'Internal server error',
      });
    });
  };
}
