import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gqlAuth.guard';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@nestjs/graphql');

describe('GqlAuthGuard', () => {
  let gqlAuthGuard: GqlAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GqlAuthGuard],
    }).compile();

    gqlAuthGuard = module.get<GqlAuthGuard>(GqlAuthGuard);
  });

  it('Should be defined', () => {
    expect(gqlAuthGuard).toBeDefined();
  });

  describe('Get Request', () => {
    it('Should extract request object from GqlExecutionContext', () => {
      const mockRequest = { headers: {}, user: {} };
      const mockContext: Partial<ExecutionContext> = {
        switchToHttp: jest.fn(),
      };

      const mockGqlExecutionContext = {
        getContext: jest.fn().mockReturnValue({ req: mockRequest }),
      };

      (GqlExecutionContext.create as jest.Mock).mockReturnValue(
        mockGqlExecutionContext,
      );

      const result = gqlAuthGuard.getRequest(mockContext as ExecutionContext);
      expect(result).toBe(mockRequest);
      expect(GqlExecutionContext.create).toHaveBeenCalledWith(mockContext);
      expect(mockGqlExecutionContext.getContext).toHaveBeenCalled();
    });
  });
});
