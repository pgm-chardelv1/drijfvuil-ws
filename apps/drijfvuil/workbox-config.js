module.exports = {
  globDirectory: "dist/apps/drijfvuil/",
  globPatterns: ["**/*.{css,eot,html,ico,jpg,js,json,png,svg,ttf,txt,webmanifest,woff,woff2,webm,xml}"],
  globFollow: true, // follow symlinks
  globStrict: true, // fail the build if anything goes wrong while reading the files
  globIgnores: [
    // Reference: https://github.com/angular/angular/issues/31256#issuecomment-506507021
    `**/*-es5.*.js`,
  ],
  dontCacheBustURLsMatching: new RegExp(".+.[a-f0-9]{20}..+"),
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4Mb
  swSrc: "dist/apps/drijfvuil/service-worker.js",
  swDest: "dist/apps/drijfvuil/service-worker.js",
};