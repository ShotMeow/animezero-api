import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let prismaClientPrototype: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    prismaClientPrototype = PrismaClient.prototype;
    jest.spyOn(prismaClientPrototype, '$connect').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('Module Init', () => {
    it('Should call $connect on PrismaClient', async () => {
      await prismaService.onModuleInit();
      expect(prismaClientPrototype.$connect).toHaveBeenCalled();
    });
  });
});
