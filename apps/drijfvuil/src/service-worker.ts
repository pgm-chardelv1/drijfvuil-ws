// Service worker
//
// References
// https://github.com/webmaxru/pwatter/blob/workbox/src/sw-default.js
// Caching strategies: https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
// Example: https://github.com/JeremieLitzler/mws.nd.2018.s3/blob/master/sw.js

// Source: https://dsebastien.medium.com/building-a-service-worker-with-workbox-5-typescript-webpack-and-angular-5015ba76340b

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import {
  /* NetworkFirst, NetworkOnly,  */ StaleWhileRevalidate,
  CacheFirst,
  NetworkOnly,
} from 'workbox-strategies';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any;
const componentName = 'Service Worker';

// Enable debug mode during development
const DEBUG_MODE =
  /* window.location.hostname.endsWith(".app.local") || */ self.location
    .hostname === 'localhost';

const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;

/**
 * The current version of the service worker.
 */
const SERVICE_WORKER_VERSION = '1.0.0';

if (DEBUG_MODE) {
  console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}

// -------------------------------------------------------------
// Precaching configuration
// -------------------------------------------------------------
cleanupOutdatedCaches();

// Precaching
// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
const assetsToCache = self.__WB_MANIFEST;
// To customize the assets afterwards:
//assetsToCache = [...assetsToCache, ???];

if (DEBUG_MODE) {
  console.trace(
    `${componentName}:: Assets that will be cached: `,
    assetsToCache,
  );
}

precacheAndRoute(assetsToCache);

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------
// Default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
const defaultRouteHandler = createHandlerBoundToURL('/index.html');
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {
  //allowlist: [],
  //denylist: [],
});
registerRoute(defaultNavigationRoute);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: YEAR_IN_SECONDS,
        maxEntries: 30,
        purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
      }),
    ],
  }),
);

registerRoute(
  /^https:\/\/[abc]\.tile\.openstreetmap\.fr\/hot\/\d{2}\/\d{5}\/\d{5}\.png/,
/*   new CacheFirst({
    cacheName: 'openstreetmap-tiles',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: YEAR_IN_SECONDS,
        maxEntries: 100,
        purgeOnQuotaError: true,
      }),
    ],
  }), */
  new StaleWhileRevalidate(),
);

// Make JS/CSS fast by returning assets from the cache
// But make sure they're updating in the background for next use
registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate());

// Cache images
// But clean up after a while
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 250,
        maxAgeSeconds: MONTH_IN_SECONDS,
        purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
      }),
    ],
  }),
);

// API access is only supported while online
registerRoute(/^https:\/\/drijfvuil-api\.onrender\.com\/graphql|files\/upload|files/, new NetworkOnly());

// -------------------------------------------------------------
// Messages
// -------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener(
  'message',
  (event: { data: any; type: any; ports: any }) => {
    if (event && event.data && event.data.type) {
      // return the version of this service worker
      if ('GET_VERSION' === event.data.type) {
        if (DEBUG_MODE) {
          console.debug(
            `${componentName}:: Returning the service worker version: ${SERVICE_WORKER_VERSION}`,
          );
        }
        event.ports[0].postMessage(SERVICE_WORKER_VERSION);
      }

      // When this message is received, we can skip waiting and become active
      // (i.e., this version of the service worker becomes active)
      // Reference about why we wait: https://stackoverflow.com/questions/51715127/what-are-the-downsides-to-using-skipwaiting-and-clientsclaim-with-workbox
      if ('SKIP_WAITING' === event.data.type) {
        if (DEBUG_MODE) {
          console.debug(`${componentName}:: Skipping waiting...`);
        }
        self.skipWaiting();
      }

      // When this message is received, we can take control of the clients with this version
      // of the service worker
      if ('CLIENTS_CLAIM' === event.data.type) {
        if (DEBUG_MODE) {
          console.debug(
            `${componentName}:: Claiming clients and cleaning old caches`,
          );
        }
        self.clients.claim();
      }
    }
  },
);
