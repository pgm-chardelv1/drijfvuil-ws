import { Icon, LatLngExpression } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { Report } from '../../interfaces';
import LeafletPopUp from './leafletPopup/LeafletPopUp';

import reportGreen from '../../assets/markers/report-green.png';
import iconShadow from '../../assets/markers/marker-shadow.png';
interface LeafletMarkerProps {
  position: LatLngExpression;
  report: Report;
}

const reportIcon = new Icon({
  iconUrl: reportGreen,
  iconSize: [25, 41],
  iconAnchor: [12, 40],
  shadowUrl: iconShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 40],
});

function LeafletReportMarker({ position, report }: LeafletMarkerProps) {
  return (
    <Marker position={position} icon={reportIcon}>
      <LeafletPopUp report={report} />
    </Marker>
  );
}

export default LeafletReportMarker;
