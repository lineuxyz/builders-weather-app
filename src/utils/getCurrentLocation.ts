import { Alert } from 'react-native';

import { hasPermissionLocation } from './';

import Geolocation from 'react-native-geolocation-service';

export async function getCurrentLocation(fillPosition: (param: any) => void) {
  const hasPermission = await hasPermissionLocation();

  if (!hasPermission) {
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      fillPosition(position);
    },
    error => {
      Alert.alert(`Code ${error.code}`, error.message);
      fillPosition(null);
      console.log(error, 'error');
    },
    {
      maximumAge: 10000,
      distanceFilter: 0,
      timeout: 15000,
      enableHighAccuracy: true,
    },
  );
}
