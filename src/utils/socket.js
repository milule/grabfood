import io from "socket.io-client";

export function createSocket(params) {
  return io("http://localhost:5000", {
    query: params,
  });
}
