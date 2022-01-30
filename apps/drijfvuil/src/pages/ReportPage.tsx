import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ReportForm, ReportHeader } from '../components';
import { RootState } from '../redux/reducers';

export default function ReportPage(): ReactElement {
  const currentReport = useSelector((state: RootState) => state.currentReport);

  return (
    <>
      <ReportHeader imageUrl={currentReport?.imageUrl} />

      <ReportForm currentReport={currentReport?.report} />
    </>
  );
}
