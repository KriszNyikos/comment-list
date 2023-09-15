import { generateUniqueId } from './generate-unique-key';

describe('#generateUniqueId', () => {
  it('should generate a unique id', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });
});
