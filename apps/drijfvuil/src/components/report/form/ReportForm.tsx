import * as yup from 'yup';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import * as paths from '../../../routes';
import {
  AppButton,
  FormImageInputModal,
  FormInputSet,
  FormRadioSet,
  FormTextAreaSet,
  FormUploadingModal,
} from '../../index';
import defaultStyles from '../../../config/styles';
import {
  CreateImageDocument,
  CreateReportDocument,
  CreateReportMutationFn,
} from '@drijfvuil-ws/data-access';
import { Report } from '../../../interfaces';
import { RootState } from '../../../redux/reducers';
import { actionCreators } from '../../../redux';
import { useUploadFile } from '../../../hooks';

const Container = styled.section`
  padding: 1.125rem 2rem;
  width: 100%;
  height: 67vh;
  overflow-y: scroll;
  background: ${defaultStyles.gradient.primary};
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const validationSchema = yup.object({
  latLngTuple: yup.array().of(yup.number()).required(),
  litterType: yup.string().required(),
  locationType: yup.string().required(),
  extra: yup.string().max(364),
  cityId: yup.number().integer().required(),
  quarterId: yup.number().integer().required(),
  dbImageId: yup.string(),
});

interface ReportFormProps {
  currentReport: Report | null | undefined;
}

export default function ReportForm({
  currentReport,
}: ReportFormProps): ReactElement {
  const [report, setReport] = useState<Report | null>(null);
  const [isUploading, setIsUploading] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetCurrentReport } = bindActionCreators(
    actionCreators.currentReportActionCreators,
    dispatch,
  );

  const [createReport, reportResult] =
    useMutation<CreateReportMutationFn>(CreateReportDocument);
  const [createImage, imageResult] = useMutation(CreateImageDocument);

  const currentLocation = useSelector((state: RootState) => state.userPosition);

  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const setVisibility = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (currentReport) setModalVisible(false);
  }, []);

  let initialValues;

  if (!currentReport) {
    initialValues = {
      latLngTuple: currentLocation,
      dbImageId: '',
      locationType: 'water',
      litterType: '',
      extra: '',
      cityId: 9000,
      quarterId: 1,
    };
  } else {
    initialValues = currentReport;
  }

  const handleClickBack = () => {
    resetCurrentReport();
    navigate(paths.HOME);
  };

  const handleSubmit = async (report: Report) => {
    setIsUploading(true);
    setReport(report);
    if (file) {
      setUpload(file);
    }
  };

  const createNewImage = async (key: string, url: string) => {
    const createImageInput = { key: key, url: url };
    const newImage = await createImage({
      variables: { createImageInput: createImageInput },
    });
    const dbImageId = newImage.data.createImage.id;
    return dbImageId;
  };

  const createNewReport = async (report: any, key: string, url: string) => {
    const dbImageId = await createNewImage(key, url);
    if (dbImageId) {
      const editReport = {
        ...report,
        dbImageId: dbImageId,
      };
      const newReport = await createReport({
        variables: { createReportInput: editReport },
      });
    }
  };

  const [source, setSource] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<File | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        const newFile = e.target.files[0];
        setFile(newFile);
        const url = URL.createObjectURL(newFile);
        setSource(url);
        setModalVisible(false);
      }
    }
  };

  const [response, loading, error] = useUploadFile(upload);

  useEffect(() => {
    if (response) {
      createNewReport(report, response.key, response.url);
      if (reportResult) {
        setIsUploading(false);
      }
    }
  }, [response]);

  return (
    <Container>
      {isUploading !== null ? (
        <FormUploadingModal
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: Report) => handleSubmit(values)}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FormImageInputModal
              visible={modalVisible}
              setVisibility={setVisibility}
              handleCapture={handleCapture}
            />

            <FormInputSet
              title="Locatie *"
              name="latLngTuple"
              placeholder="Uw locatie"
            />

            <FormInputSet
              title="Soort afval *"
              name="litterType"
              placeholder="soort afval"
              error={errors.litterType}
              touched={touched.litterType}
            />

            <FormRadioSet
              title="Land of water"
              name="locationType"
              labels={['water', 'land']}
              values={['water', 'land']}
            />

            <FormTextAreaSet
              title="Info"
              name="extra"
              placeholder="extra info"
              error={errors.extra}
              touched={touched.extra}
            />

            <ButtonContainer>
              <AppButton
                onClick={handleClickBack}
                width="8rem"
                fontSize={defaultStyles.font.size.large}
                fontFamily={defaultStyles.font.family.bebas}
              >
                terug
              </AppButton>

              <AppButton
                type="submit"
                width="8rem"
                fontSize={defaultStyles.font.size.large}
                fontFamily={defaultStyles.font.family.bebas}
              >
                indienen
              </AppButton>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
