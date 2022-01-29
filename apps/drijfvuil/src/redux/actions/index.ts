import { LatLngExpression } from 'leaflet';

import {
  CurrentReportActionType,
  ReportsActionType,
  UserPositionActionType,
} from '../action-types';
import { Report } from '../../interfaces';

//Reports action type and actions
interface SetReportsAction {
  type: ReportsActionType.SET_REPORTS;
  payload: Report[];
}

interface ResetReportsAction {
  type: ReportsActionType.RESET_REPORTS;
}

type ReportsAction = SetReportsAction | ResetReportsAction;

//User position action type and actions
interface SetUserPositionAction {
  type: UserPositionActionType.SET_USER_POSTION;
  payload: LatLngExpression;
}

interface ResetUserPositionAction {
  type: UserPositionActionType.RESET_USER_POSTION;
}

type UserPositionAction = SetUserPositionAction | ResetUserPositionAction;

//Current report action type and actions
interface SetCurrentReportAction {
  type: CurrentReportActionType.SET_CURRENT_REPORT;
  payload: { report: Report; imageUrl: string };
}

interface ResetCurrentReportAction {
  type: CurrentReportActionType.RESET_CURRENT_REPORT;
}

type CurrentReportAction = SetCurrentReportAction | ResetCurrentReportAction;

export { CurrentReportAction, ReportsAction, UserPositionAction };
