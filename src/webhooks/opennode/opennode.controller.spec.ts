import { Test, TestingModule } from '@nestjs/testing';
import { OpennodeController } from './opennode.controller';

describe('Opennode Controller', () => {
  let controller: OpennodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpennodeController],
    }).compile();

    controller = module.get<OpennodeController>(OpennodeController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
