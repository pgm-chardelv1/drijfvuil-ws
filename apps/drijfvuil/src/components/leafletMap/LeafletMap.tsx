import styled from 'styled-components';
import { LayerGroup, MapContainer, TileLayer } from 'react-leaflet';
import React, { ReactElement } from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';

import {
  LeafletContext,
  LeafletPlaceHolder,
  LeafletPolygons,
  LeafletUserMarker,
} from './index';
import { RootState } from '../../redux/reducers';

interface LeafletMapProps {
  handleOnLoad: (state: boolean) => void;
  children?: React.ReactNodeArray | null;
}

const StyledContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const zoom = 17;

const LeafletMap = ({
  handleOnLoad,
  children,
}: LeafletMapProps): ReactElement => {
  const userCoordinates = useSelector((state: RootState) => state.userPosition);

  return (
    <StyledContainer>
      {userCoordinates && (
        <MapContainer
          id="mapId"
          center={userCoordinates}
          zoom={zoom}
          whenReady={() => handleOnLoad(false)}
          placeholder={<LeafletPlaceHolder />}
        >
          <LayerGroup>
            <LeafletContext />
          </LayerGroup>

          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
          />
          <LeafletUserMarker position={userCoordinates} />

          <MarkerClusterGroup>{children}</MarkerClusterGroup>

          <LeafletPolygons />
        </MapContainer>
      )}
    </StyledContainer>
  );
};

export default LeafletMap;
