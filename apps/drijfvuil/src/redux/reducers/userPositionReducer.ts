import { LatLngExpression } from 'leaflet';
import { UserPositionActionType } from '../action-types';
import { UserPositionAction } from '../actions';

const initialState: LatLngExpression = [51.1489662, 3.51873];

const userPositionReducer = (
  state: LatLngExpression = initialState,
  action: UserPositionAction,
): LatLngExpression => {
  switch (action.type) {
    case UserPositionActionType.SET_USER_POSTION:
      return (state = action.payload);
    case UserPositionActionType.RESET_USER_POSTION:
      return (state = initialState);
    default:
      return state;
  }
};

export default userPositionReducer;
