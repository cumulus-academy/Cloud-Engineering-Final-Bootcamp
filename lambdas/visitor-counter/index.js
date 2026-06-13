// =============================================================================
// Visitor Counter Lambda  —  PROVIDED BY THE ACADEMY (complete)
// =============================================================================
// Atomically increments a counter in DynamoDB and returns the new total.
// Intended to sit behind API Gateway (HTTP API) as GET /api/visits.
//
// You do NOT need to change this code. Your job (Milestone 6) is to:
//   - create the DynamoDB table with Terraform
//   - package + deploy this function with Terraform
//   - give the function's IAM role permission to UpdateItem on the table
//   - wire API Gateway -> this Lambda
//
// Environment variables:
//   VISITOR_TABLE_NAME   DynamoDB table name        (default: "visitor-counter")
//   AWS_REGION           set automatically by Lambda
//   DYNAMODB_ENDPOINT    optional — point at DynamoDB Local for testing
//   USE_MEMORY_STORE=1   optional — in-memory counter for OFFLINE testing only
//
// DynamoDB table shape (you create this in Terraform):
//   partition key:  id   (String)   -> we use the single item id = "site-visits"
//   counter attr:   visits (Number) -> incremented with an atomic ADD
// =============================================================================

const TABLE_NAME = process.env.VISITOR_TABLE_NAME || "visitor-counter";
const COUNTER_ID = "site-visits";

// ---- In-memory fallback (OFFLINE TESTING ONLY) ------------------------------
let memoryCount = 0;

// ---- DynamoDB access (SDK imported lazily so offline tests need no install) --
let _doc;
let _UpdateCommand;

async function dynamoIncrement() {
  if (!_doc) {
    const { DynamoDBClient } = await import("@aws-sdk/client-dynamodb");
    const { DynamoDBDocumentClient, UpdateCommand } = await import("@aws-sdk/lib-dynamodb");
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      // For DynamoDB Local set DYNAMODB_ENDPOINT=http://localhost:8000
      ...(process.env.DYNAMODB_ENDPOINT ? { endpoint: process.env.DYNAMODB_ENDPOINT } : {}),
    });
    _doc = DynamoDBDocumentClient.from(client);
    _UpdateCommand = UpdateCommand;
  }

  const res = await _doc.send(
    new _UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: COUNTER_ID },
      UpdateExpression: "ADD visits :one",
      ExpressionAttributeValues: { ":one": 1 },
      ReturnValues: "UPDATED_NEW",
    })
  );
  return Number(res.Attributes?.visits ?? 0);
}

async function incrementAndGet() {
  if (process.env.USE_MEMORY_STORE === "1") {
    memoryCount += 1;
    return memoryCount;
  }
  return dynamoIncrement();
}

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
};

// Works for both API Gateway REST (httpMethod) and HTTP API v2 (requestContext).
function getMethod(event) {
  return event?.httpMethod || event?.requestContext?.http?.method || "GET";
}

export async function handler(event) {
  if (getMethod(event) === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  try {
    const visits = await incrementAndGet();
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ visits }),
    };
  } catch (err) {
    console.error("[visitor-counter] error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Could not update visitor count" }),
    };
  }
}
