import { Test, TestingModule } from '@nestjs/testing';
import { ChainInvoiceService } from './chain-invoice.service';

describe('ChainInvoiceService', () => {
  let service: ChainInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainInvoiceService],
    }).compile();

    service = module.get<ChainInvoiceService>(ChainInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
