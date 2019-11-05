import { Test, TestingModule } from '@nestjs/testing';
import { LightningInvoiceService } from './lightning-invoice.service';

describe('LightningInvoiceService', () => {
  let service: LightningInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightningInvoiceService],
    }).compile();

    service = module.get<LightningInvoiceService>(LightningInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
