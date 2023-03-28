const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = require("./dpk");
const crypto = require('crypto');

// Mocks
const digestResult = 'encrypt 123';
const hashMock = {
  update: jest.fn().mockReturnThis(),
  digest: jest.fn().mockReturnValueOnce(digestResult),
};

describe("deterministicPartitionKey", () => {
  it("Returns TRIVIAL_PARTITION_KEY when given no input", () => {
    const key = deterministicPartitionKey();
    expect(key).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns a new partition key when it is not informed", () => {
    jest.spyOn(crypto, 'createHash').mockImplementationOnce(() => hashMock);
    const event = {};
    const key = deterministicPartitionKey(event);
    expect(key).toBe(digestResult);
  });

  it("Returns the informed partition key", () => {
    const partitionKey = '1'.repeat(MAX_PARTITION_KEY_LENGTH)
    const key = deterministicPartitionKey({ partitionKey });
    expect(key).toBe(partitionKey);
  });

  it("Returns a new partition when JSON is larger than MAX_PARTITION_KEY_LENGTH", () => {
    const partitionKey = '1'.repeat(MAX_PARTITION_KEY_LENGTH + 1)
    const key = deterministicPartitionKey({ partitionKey });
    expect(key).not.toBe(partitionKey);
  });

  it("Converts partition key to string", () => {
    const event = { partitionKey: 1 };
    const key = deterministicPartitionKey(event);
    expect(key).toBe("1");
  });
});
