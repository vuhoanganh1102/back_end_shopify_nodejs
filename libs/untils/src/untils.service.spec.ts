import { Test, TestingModule } from '@nestjs/testing';
import { UntilsService } from './untils.service';

describe('UntilsService', () => {
  let service: UntilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UntilsService],
    }).compile();

    service = module.get<UntilsService>(UntilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
