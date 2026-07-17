import 'reflect-metadata';
import { TestingModule, Test } from '@nestjs/testing';

export async function createTestingModule(metadata: Parameters<typeof Test.createTestingModule>[0]): Promise<TestingModule> {
  return Test.createTestingModule(metadata).compile();
}
