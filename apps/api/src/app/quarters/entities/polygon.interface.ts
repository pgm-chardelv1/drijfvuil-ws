// Define the interfaces and types needed for polygon use

/**
 * Interface for latitude and longitude object
 *
 * @export
 * @interface LatLng
 */
export interface LatLng {
  lat: number;
  lng: number;
  alt?: number | undefined;
}

/**
 * Literal expression of latitude and longitude
 *
 * @export
 * @interface LatLngLiteral
 */
export interface LatLngLiteral {
  lat: number;
  lng: number;
}
export type LatLngExpression = LatLng | LatLngLiteral | LatLngTuple;

export type LatLngTuple = [number, number];

export type PolygonType = LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
