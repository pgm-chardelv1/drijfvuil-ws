import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({
        link: 'http://localhost:3333/graphql',
        message:
          '🚀 Welcome to the Drijfvuil api. This API is managed by GraphQL. You can test it out by visiting the link provided!',
      });
    });
  });
});
