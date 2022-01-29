import React, { ReactElement } from 'react';
import ToggleButton from './ToggleButton';

interface MapToggleProps {
  active: boolean;
  handleOnClick: () => void;
}

export default function MapToggle({
  active,
  handleOnClick,
}: MapToggleProps): ReactElement {
  return (
    <ToggleButton active={active} onClick={handleOnClick}>
      <span>foto</span>

      <span>map</span>
    </ToggleButton>
  );
}
