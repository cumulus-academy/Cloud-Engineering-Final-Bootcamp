// =============================================================================
// Offline smoke test for the visitor-counter handler.
//
//   node local-run.js
//
// With no AWS credentials and no DYNAMODB_ENDPOINT set, this uses the in-memory
// store so you can see the handler work without any AWS setup or `npm install`.
//
// To test against real DynamoDB Local (optional):
//   1. docker run -p 8000:8000 amazon/dynamodb-local
//   2. create the table (see README.md)
//   3. DYNAMODB_ENDPOINT=http://localhost:8000 AWS_REGION=us-east-1 \
//        AWS_ACCESS_KEY_ID=x AWS_SECRET_ACCESS_KEY=x node local-run.js
// =============================================================================

if (!process.env.DYNAMODB_ENDPOINT && !process.env.AWS_ACCESS_KEY_ID) {
  process.env.USE_MEMORY_STORE = "1";
  console.log("(no AWS config detected — using in-memory store)\n");
}

const { handler } = await import("./index.js");

const mockEvent = { requestContext: { http: { method: "GET" } } };

for (let i = 0; i < 3; i++) {
  const res = await handler(mockEvent);
  console.log(`request ${i + 1} -> status ${res.statusCode}, body ${res.body}`);
}
