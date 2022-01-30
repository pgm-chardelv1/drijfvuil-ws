import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { CgImage } from 'react-icons/cg';

import { ImageContainer } from '../../common';
import MapToggle from './MapToggle';
import defaultStyles from '../../../config/styles';

const Container = styled(ImageContainer)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface ReportHeaderProps {
  imageUrl: string | undefined;
}

export default function ReportHeader({
  imageUrl,
}: ReportHeaderProps): ReactElement {
  const [mapActive, setMapActive] = useState<boolean>(false);

  let url;
  if (imageUrl) {
    url = imageUrl;
  } else {
    url = 'https://picsum.photos/800/300';
  }

  const handleOnClick = () => {
    setMapActive(!mapActive);
  };
  return (
    <Container height="33vh">
      {!imageUrl ? (
        <CgImage size={60} color={defaultStyles.color.highLight} />
      ) : (
        <img src={imageUrl} alt="" />
      )}

      <MapToggle active={mapActive} handleOnClick={handleOnClick} />
    </Container>
  );
}
