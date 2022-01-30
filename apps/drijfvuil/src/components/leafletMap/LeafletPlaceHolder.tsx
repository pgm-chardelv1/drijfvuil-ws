import React from 'react';
import { LoadingScreen } from '../common';

const LeafletPlaceHolder: React.FC = () => {
  return (
    <LoadingScreen
      title="Oeps er ging iets mis."
      info="Om de kaart te bekijken moet je JavaScript inschakelen."
    />
  );
};

export default LeafletPlaceHolder;
