export function mapOrder(data, info, driverLocation) {
  const { user, location, order, destination } = data;
  const { latitude: customerLat, longitude: customerLng } = location;
  const { latitude: driverLat, longitude: driverLng } = driverLocation;
  const {
    latitude: receiveLat,
    longitude: receiveLng,
    address: receiveAddress,
  } = destination;
  const {
    username: driverUsername,
    email: driverEmail,
    name: driverName,
    phone: driverPhone,
  } = info;
  const {
    username: customerUsername,
    email: customerEmail,
    name: customerName,
    phone: customerPhone,
  } = user;
  const {
    userName: receiveName,
    userPhone: receivePhone,
    productName,
    productWeight,
  } = order;

  return {
    customer: customerUsername,
    driver: driverUsername,
    customerName: customerName,
    customerPhone: customerPhone,
    customerLat: customerLat,
    customerLng: customerLng,
    driverName: driverName,
    driverPhone: driverPhone,
    driverLat: driverLat,
    driverLng: driverLng,
    receiveName: receiveName,
    receivePhone: receivePhone,
    receiveAddress: receiveAddress,
    receiveLat: receiveLat,
    receiveLat: receiveLng,
    productName: productName,
    productWeight: productWeight,
  };
}
