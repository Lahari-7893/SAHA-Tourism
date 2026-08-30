export const locationService = {
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  },
  
  watchPosition: (callback) => {
    if (!navigator.geolocation) {
      return null;
    }
    return navigator.geolocation.watchPosition(
      (position) => {
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error watching position:", error);
      }
    );
  },
  
  clearWatch: (watchId) => {
    if (navigator.geolocation && watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  },
  
  isGeolocationAvailable: () => {
    return 'geolocation' in navigator;
  }
};
