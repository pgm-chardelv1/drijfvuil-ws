import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../redux';

const useFetchUserPosition = () => {
  const dispatch = useDispatch();
  const { setUserPosition } = bindActionCreators(
    actionCreators.userPositionActionCreators,
    dispatch,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoordinates: LatLngExpression = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setUserPosition(newCoordinates);
      },
      (error) => {
        return error;
      },
    );
  });
};

export default useFetchUserPosition;
