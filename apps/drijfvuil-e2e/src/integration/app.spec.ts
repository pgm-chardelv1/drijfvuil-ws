import { getMap } from '../support/app.po';

describe('drijfvuil', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a leaflet map', () => {
    /**
     * getMap, see '../support/app.po.ts'
     * The map should have the class 'leaflet container'
     * ... should have a .leaflet-pane descendant
     * ... should have a .leaflet-control-container descendant
     * ... should have an attribution element
     */
    getMap().should('have.class', 'leaflet-container');
    getMap().should('have.descendants', '.leaflet-pane');
    getMap().should('have.descendants', '.leaflet-control-container');
    getMap().should('have.descendants', '.leaflet-control-attribution');
  });
});
