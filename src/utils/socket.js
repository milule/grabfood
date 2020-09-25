import io from "socket.io-client";

export function createSocket(params) {
  return io("https://pri-fastfood.herokuapp.com", {
    query: params,
  });
}

export function closeSocket(instance) {
  if (!instance) return;
  instance.close();
}
