import { Dispatch } from 'redux';
import { Report } from '../../interfaces';
import { ReportsActionType } from '../action-types';
import { ReportsAction } from '../actions';

export const setReports = (reports: Report[]) => {
  return (dispatch: Dispatch<ReportsAction>) => {
    dispatch({
      type: ReportsActionType.SET_REPORTS,
      payload: reports,
    });
  };
};

export const resetReports = () => {
  return (dispatch: Dispatch<ReportsAction>) => {
    dispatch({
      type: ReportsActionType.RESET_REPORTS,
    });
  };
};
