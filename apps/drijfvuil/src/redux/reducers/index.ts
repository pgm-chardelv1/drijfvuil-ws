import { combineReducers } from 'redux';

import currentReportReducer from './currentReportReducer';
import reportsReducer from './reportsReducer';
import userPositionReducer from './userPositionReducer';

const reducers = combineReducers({
  currentReport: currentReportReducer,
  reports: reportsReducer,
  userPosition: userPositionReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
