import React from 'react';
import { Polygon } from 'react-leaflet';

import { data } from '@drijfvuil-ws/data';

const LeafletPolygons: React.FC = () => {
  const options = [
    { fillColor: 'purple' },
    { fillColor: 'orange' },
    { fillColor: 'green' },
    { fillColor: 'lime' },
    { fillColor: 'red' },
    { fillColor: 'yellow' },
    { fillColor: 'violet' },
    { fillColor: 'blue' },
    { fillColor: 'dodgerblue' },
    { fillColor: 'magenta' },
    { fillColor: 'pink' },
    { fillColor: 'purple' },
    { fillColor: 'orange' },
    { fillColor: 'green' },
    { fillColor: 'lime' },
    { fillColor: 'red' },
    { fillColor: 'yellow' },
    { fillColor: 'violet' },
    { fillColor: 'blue' },
    { fillColor: 'dodgerblue' },
    { fillColor: 'magenta' },
    { fillColor: 'pink' },
    { fillColor: 'purple' },
    { fillColor: 'orange' },
    { fillColor: 'teal' },
  ];

  return (
    <>
      {data.map((r, i) => (
        <Polygon key={i} pathOptions={options[i]} positions={r.polygon} />
      ))}
    </>
  );
};

export default LeafletPolygons;
