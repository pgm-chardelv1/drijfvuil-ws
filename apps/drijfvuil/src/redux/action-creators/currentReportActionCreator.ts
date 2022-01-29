import { Dispatch } from 'redux';
import { Report } from '../../interfaces';
import { CurrentReportActionType } from '../action-types';
import { CurrentReportAction } from '../actions';

export const setCurrentReport = (report: Report, imageUrl: string) => {
  return (dispatch: Dispatch<CurrentReportAction>) => {
    dispatch({
      type: CurrentReportActionType.SET_CURRENT_REPORT,
      payload: { report: report, imageUrl: imageUrl },
    });
  };
};

export const resetCurrentReport = () => {
  return (dispatch: Dispatch<CurrentReportAction>) => {
    dispatch({
      type: CurrentReportActionType.RESET_CURRENT_REPORT,
    });
  };
};
