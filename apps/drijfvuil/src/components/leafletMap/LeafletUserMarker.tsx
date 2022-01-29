import { Icon, LatLngExpression } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Report } from '../../interfaces';
import LeafletPopUp from './leafletPopup/LeafletPopUp';

import addReport from '../../assets/markers/add-report.png';
import iconShadow from '../../assets/markers/marker-shadow.png';
import * as paths from '../../routes';
interface LeafletUserMarkerProps {
  position: LatLngExpression;
}

const addReportIcon = new Icon({
  iconUrl: addReport,
  iconSize: [25, 41],
  iconAnchor: [12, 40],
  shadowUrl: iconShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 40],
});

function LeafletUserMarker({ position }: LeafletUserMarkerProps) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(paths.REPORT);
  };

  return (
    <Marker position={position} eventHandlers={{ click: handleOnClick }} icon={addReportIcon} />
  );
}

export default LeafletUserMarker;
