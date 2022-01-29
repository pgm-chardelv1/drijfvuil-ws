import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { LeafletMap, LoadingScreen, MainNavigation } from '../components';
import { RootState } from '../redux/reducers';
import LeafletReportMarker from '../components/leafletMap/LeafletReportMarker';

function HomePage(): ReactElement {
  const reports = useSelector((state: RootState) => state.reports);

  const [loading, setLoading] = useState(true);

  const handleOnLoad = (state: boolean) => {
    setLoading(state);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen
          title="Wist je dat?"
          info="Iets met pinguins die seksueel misbruikt worden door zeehonden."
        />
      ) : (
        <MainNavigation />
      )}

      <LeafletMap handleOnLoad={handleOnLoad}>
        {reports &&
          reports.map((report, i) => (
            <LeafletReportMarker position={report.latLngTuple} report={report} key={i} />
          ))}
      </LeafletMap>
    </>
  );
}

export default HomePage;
