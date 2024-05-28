// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "hello world !"', async () => {
      // Arrange
      const expectedResponse = 'hello world !';

      // Act
      const result = await appController.getHello();

      // Assert
      expect(result).toBe(expectedResponse);
    });
  });
});
