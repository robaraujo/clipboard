const crypto = require("crypto");

// Move constants out of fn so they can be used in other files like tests
exports.TRIVIAL_PARTITION_KEY = "0";
exports.MAX_PARTITION_KEY_LENGTH = 256;

// Create this logic as a fn to be reused
const generatePartitionKey = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  // empty event, return default value
  if (!event) {
    return exports.TRIVIAL_PARTITION_KEY;
  }

  // Empty partitionKey, generate a new one based on JSON string
  // There is no need for isString and length check as a new hash was generated
  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    return generatePartitionKey(data);
  }
  
  let candidate = event.partitionKey;
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > exports.MAX_PARTITION_KEY_LENGTH) {
    candidate = generatePartitionKey(candidate);
  }
  return candidate;
};