import { LatLngExpression } from 'leaflet';
import { Dispatch } from 'redux';
import { UserPositionActionType } from '../action-types';
import { UserPositionAction } from '../actions';

export const setUserPosition = (position: LatLngExpression) => {
  return (dispatch: Dispatch<UserPositionAction>) => {
    dispatch({
      type: UserPositionActionType.SET_USER_POSTION,
      payload: position,
    });
  };
};

export const resetUserPosition = () => {
  return (dispatch: Dispatch<UserPositionAction>) => {
    dispatch({
      type: UserPositionActionType.RESET_USER_POSTION,
    });
  };
};
