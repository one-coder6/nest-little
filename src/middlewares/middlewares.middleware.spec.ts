import { CommonMiddleware } from './common.middleware';

describe('MiddlewaresMiddleware', () => {
  it('should be defined', () => {
    expect(new CommonMiddleware()).toBeDefined();
  });
});
