import { City, Quarter } from '@drijfvuil-ws/data-access';
import { LatLngExpression } from 'leaflet';

export interface Report {
  latLngTuple: LatLngExpression;
  id?: number;
  imageId: string;
  quarter?: Quarter;
  locationType: string;
  litterType: string;
  extra: string;
  city?: City;
  createdAt?: Date;
}
