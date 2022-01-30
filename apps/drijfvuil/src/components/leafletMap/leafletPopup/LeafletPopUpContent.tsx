import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as paths from '../.././../routes';
import { Report } from '../../../interfaces';
import {
  AppButton,
  AppTitle,
  ImageContainer,
  LoadingAnimation,
} from '../../common';
import defaultStyles from '../../../config/styles';
import TypeList from './TypeList';

import { actionCreators } from '../../../redux';
import { useFetchImage } from '../../../hooks';

const InfoContainer = styled.div`
  height: 100%;
  padding: 1rem;
  color: ${defaultStyles.color.white};
  background: rgb(0, 12, 14);
  background: ${defaultStyles.gradient.primary};
`;

const ButtonContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface LeafletPopUpContentProps {
  report: Report;
}

export default function LeafletPopUpContent({
  report,
}: LeafletPopUpContentProps): ReactElement {
  const { url, loading, error } = useFetchImage(report.imageId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCurrentReport } = bindActionCreators(
    actionCreators.currentReportActionCreators,
    dispatch,
  );

  const handleUpdateOnClick = () => {
    if (url) setCurrentReport(report, url);
    navigate(paths.REPORT);
  };

  return (
    <>
      <ImageContainer height="17.5rem">
        {loading && !error && <LoadingAnimation />}

        {url && !error && (
          <img src={url} alt={'Report ' + report.id} loading="lazy" />
        )}
        {error && console.error(error)}
      </ImageContainer>

      <InfoContainer>
        <AppTitle>Locatie</AppTitle>

        <p>{report.latLngTuple}</p>

        <TypeList types={report.litterType} />

        <AppTitle>Info</AppTitle>

        <p>{report.extra}</p>

        <ButtonContainer>
          <AppButton width={'45%'}>opgeruimd</AppButton>

          <AppButton width={'45%'} onClick={handleUpdateOnClick}>
            wijzig
          </AppButton>
        </ButtonContainer>
      </InfoContainer>
    </>
  );
}
