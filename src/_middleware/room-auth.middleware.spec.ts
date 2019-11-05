import { RoomAuthMiddleware } from './room-auth.middleware';

describe('RoomAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new RoomAuthMiddleware()).toBeDefined();
  });
});
