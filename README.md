[![Distributed Task Execution](https://github.com/pgm-chardelv1/drijfvuil-ws/actions/workflows/deploy.yml/badge.svg?branch=main&event=workflow_run)](https://github.com/pgm-chardelv1/drijfvuil-ws/actions/workflows/deploy.yml)

# StudioGdmPgm Workspace - Drijfvuil

## Release v1.0.0 Alpha: What's Changed
### Apps & Code
* apps/api by @pgm-chardelv1 generated API services, entities, providers and controllers for the API resources
* apps/drijfvuil by @pgm-bramvand2 generated front-end pages, components and prototype


### CI/CD
* Github workflows by @pgm-chardelv1 for continuous integration on affected code
* Deployment blueprints by @pgm-chardelv1 for continuous deployment on https://render.com
  * Deploy front-end project to https://drijfvuil.onrender.com
  * Deploy API project to https://drijfvuil-api.onrender.com 
    * with GraphQL at https://drijfvuil-api.onrender.com/graphql
    * with file upload endpoint for uploading files to Amazon S3 at https://drijfvuil-api.onrender.com/files/upload
      ```js 
      // Example request
      {
         "method": "POST",
         "headers": {
           "Content-Type": "multipart/form-data"
         },
         "body": {
           "upload": "[file]"
         }
      }

      // Example response:
      {
         "url": "[some-url]", // Amazon S3 link where file was uploaded to. Cannot be used to access the file directly
         "key": "[some-file-name]", // The file name or key to retrieve the image by (see: presigned URL)
      }
    * with endpoint for creating a presigned URL link from the Amazon S3 bucket at https://drijfvuil-api.onrender.com/files
       ```js 
      // Example request
      {
         "method": "GET",
         "headers": {
           "Content-Type": "application/json"
         },
         "body": {
           "id": "[some-image-key]" // The file name or key to retrieve the image by (part of Image in DB as Image.key)
         }
      }
      
      // Example response
      "[some-long-presigned-url-generated-by-amazon-s3-that-will-expire]"     

## New Contributors
* @pgm-bramvand2 made their first contribution in https://github.com/pgmgent-atwork-3/drijfvuil
* @pgm-chardelv1 made their first contribution in https://github.com/pgmgent-atwork-3/drijfvuil

**Full Changelog**: https://github.com/pgmgent-atwork-3/drijfvuil/commits/v1.0.0

## Get started with this repository

- Clone the project
  - `git clone https://github.com/pgmgent-atwork-3/drijfvuil.git`
- Open the project folder
  - `cd drijfvuil`
- Install Nx Console
  - [Nx Console VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- Install Nx globally
  - `npm i -g nx`
- Install node modules
  - `npm i`
- Start the React Client
  - `yarn start` OR `npm run start`
- Start the API
  - `yarn start api` OR `npm run start api`

- [Git Flow Cheat Sheet](./gitflow-cheatsheet.md)

## Add a UI library : 
- `nx g @nrwl/react:lib ui`

## Import from a library example:
- `import { Button } from '@drijfvuil-ws/ui'`

## Add a React component for UI : 
- `nx g @nrwl/react:component xyz --project=ui?? where xyz is the name of the component`
Example: 
`nx g @nrwl/react:component animated-logo --project=ui`

## Generic Nx readme
This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

???? **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@drijfvuil-ws/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ??? Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx???s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
