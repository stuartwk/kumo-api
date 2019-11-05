import { Test, TestingModule } from '@nestjs/testing';
import { OpenNodeService } from './opennode.service';

describe('OpennodeService', () => {
  let service: OpenNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenNodeService],
    }).compile();

    service = module.get<OpenNodeService>(OpenNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
