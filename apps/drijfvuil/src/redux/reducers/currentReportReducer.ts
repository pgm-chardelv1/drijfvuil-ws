import { Report } from '../../interfaces';
import { CurrentReportActionType } from '../action-types';
import { CurrentReportAction } from '../actions';

const initialState = null;

const currentReportReducer = (
  state: { report: Report; imageUrl: string } | null = initialState,
  action: CurrentReportAction,
): { report: Report; imageUrl: string } | null => {
  switch (action.type) {
    case CurrentReportActionType.SET_CURRENT_REPORT:
      return (state = action.payload);
    case CurrentReportActionType.RESET_CURRENT_REPORT:
      return (state = initialState);
    default:
      return state;
  }
};

export default currentReportReducer;
