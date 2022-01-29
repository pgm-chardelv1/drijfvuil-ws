import { Report } from '../../../interfaces';
import React, { ReactElement } from 'react';
import { Popup } from 'react-leaflet';
import styled from 'styled-components';

import defaultStyles from '../../../config/styles';
import LeafletPopUpContent from './LeafletPopUpContent';

const StyledPopUp = styled(Popup)`
  .leaflet-popup-content-wrapper {
    padding: 0;
    width: 80vw;
    max-width: 20rem;
    border-radius: 1rem;
    overflow: hidden;

    .leaflet-popup-content {
      margin: 0;
      width: 100% !important;

      p {
        margin-top: 0;
      }
    }
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }

  a.leaflet-popup-close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    top: 1.5rem;
    right: 1.5rem;
    font-size: ${defaultStyles.font.size.xl};
    color: ${defaultStyles.color.white};
  }
`;

interface LeafletPopUpProps {
  report: Report;
}

export default function LeafletPopUp({
  report,
}: LeafletPopUpProps): ReactElement {
  return (
    <StyledPopUp>
      <LeafletPopUpContent report={report} />
    </StyledPopUp>
  );
}
