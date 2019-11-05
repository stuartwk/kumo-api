import { Test, TestingModule } from '@nestjs/testing';
import { ChargeGateway } from './charge.gateway';

describe('ChargeGatewayGateway', () => {
  let gateway: ChargeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargeGateway],
    }).compile();

    gateway = module.get<ChargeGateway>(ChargeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
