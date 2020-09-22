function grantPermission() {
  if (window && window.navigator && window.navigator.geolocation) return true;
  return false;
}

const resolvePos = (res) => (position) => {
  res(position.coords);
};

const rejectPos = (res) => () => {
  res({ latitude: 0, longitude: 0 });
};

function getPosition() {
  const { geolocation } = window.navigator;

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  return new Promise((res) => {
    geolocation.getCurrentPosition(resolvePos(res), rejectPos(res), options);
  });
}

function watchPosition(callback) {
  const { geolocation } = window.navigator;

  return geolocation.watchPosition(
    (position) => callback(position),
    (err) => console.log(err)
  );
}

function clearPosition(id) {
  const { geolocation } = window.navigator;

  geolocation.clearWatch(id);
}

export const geoService = {
  getPosition,
  watchPosition,
  clearPosition,
  grantPermission,
};
