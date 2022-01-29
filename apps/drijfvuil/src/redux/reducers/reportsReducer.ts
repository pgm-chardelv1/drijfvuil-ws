import { Report } from '../../interfaces';
import { ReportsActionType } from '../action-types';
import { ReportsAction } from '../actions';

const initialState: Report[] = [];

const reportsReducer = (
  state: Report[] = initialState,
  action: ReportsAction,
): Report[] => {
  switch (action.type) {
    case ReportsActionType.SET_REPORTS:
      return (state = action.payload);
    case ReportsActionType.RESET_REPORTS:
      return (state = initialState);
    default:
      return state;
  }
};

export default reportsReducer;
