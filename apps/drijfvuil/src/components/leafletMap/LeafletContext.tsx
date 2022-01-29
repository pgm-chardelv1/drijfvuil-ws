import React, { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const LeafletContext: React.FC = (): null => {
  const userCoordinates = useSelector((state: RootState) => state.userPosition);

  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      // console.log('Location found: ', location);
    },
  });

  useEffect(() => {
    map.setView(userCoordinates);
  }, [map, userCoordinates]);

  return null;
};

export default LeafletContext;
