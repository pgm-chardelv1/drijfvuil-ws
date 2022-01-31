import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LatLngExpression } from 'leaflet';

import * as Paths from '../routes';
import { AboutPage, HomePage, LegalPage, ReportPage } from '../pages';
import { actionCreators } from '../redux';
import { ReportListDocument } from '@drijfvuil-ws/data-access';
import { useQuery } from '@apollo/client';
import { LoadingScreen } from '../components/common';
import { Report } from '../interfaces';

const StyledApp = styled.div`
  height: 99.9vh;
  width: 99.9vw;
  margin: 0;
  padding: 0;

  #mapId {
    height: 99.9vh;
    width: 99.9vw;
  }
`;

export function App() {
  const dispatch = useDispatch();

  const { setUserPosition } = bindActionCreators(
    actionCreators.userPositionActionCreators,
    dispatch,
  );

  const { setReports } = bindActionCreators(
    actionCreators.reportsActionCreators,
    dispatch,
  );

  const { loading, error, data } = useQuery(ReportListDocument, {
    pollInterval: 60000,
  });
  const reports: Report[] = data?.reports?.map((r: Report) => r);
  if (!loading && !error) setReports(reports);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoordinates: LatLngExpression = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setUserPosition(newCoordinates);
      },
      (error) => {
        return error;
      },
    );
  });

  if (loading)
    return (
      <LoadingScreen
        title="Wist je dat?"
        info="Hier komt een interessant weetje"
      />
    );
  if (error) return <p>Error </p>;

  return (
    <StyledApp>
      <Routes>
        <Route path={Paths.ABOUT} element={<AboutPage />} />
        <Route path={Paths.HOME} element={<HomePage />} />
        <Route path={Paths.LEGAL} element={<LegalPage />} />
        <Route path={Paths.REPORT} element={<ReportPage />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
