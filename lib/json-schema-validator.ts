import Ajv, { type ErrorObject, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import Ajv2020 from "ajv/dist/2020";

export type SchemaDraft = "draft-7" | "draft-2020-12";

export type ValidationError = {
  path: string;
  message: string;
  plainEnglish: string;
};

export type JsonSchemaValidationResult = {
  valid: boolean;
  errors: ValidationError[];
  schemaError: string | null;
  dataError: string | null;
};

const draft7Ajv = new Ajv({ allErrors: true, strict: false });
addFormats(draft7Ajv);

const draft2020Ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(draft2020Ajv);

export const DEFAULT_PERSON_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "age"]
}`;

export const DEFAULT_PERSON_DATA = `{
  "name": "Arjun",
  "age": 28,
  "email": "arjun@example.com"
}`;

export const SCHEMA_EXAMPLES: Record<
  string,
  { schema: string; data: string }
> = {
  person: {
    schema: DEFAULT_PERSON_SCHEMA,
    data: DEFAULT_PERSON_DATA,
  },
  product: {
    schema: `{
  "type": "object",
  "properties": {
    "sku": { "type": "string" },
    "name": { "type": "string" },
    "price": { "type": "number", "minimum": 0 },
    "inStock": { "type": "boolean" }
  },
  "required": ["sku", "name", "price"]
}`,
    data: `{
  "sku": "WU-001",
  "name": "Widget Pro",
  "price": 999,
  "inStock": true
}`,
  },
  api: {
    schema: `{
  "type": "object",
  "properties": {
    "status": { "type": "integer", "enum": [200, 201, 400, 404, 500] },
    "message": { "type": "string" },
    "data": { "type": "object" }
  },
  "required": ["status", "message"]
}`,
    data: `{
  "status": 200,
  "message": "Success",
  "data": { "id": 42 }
}`,
  },
  registration: {
    schema: `{
  "type": "object",
  "properties": {
    "username": { "type": "string", "minLength": 3 },
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 8 },
    "age": { "type": "integer", "minimum": 18 }
  },
  "required": ["username", "email", "password"]
}`,
    data: `{
  "username": "arjun_dev",
  "email": "arjun@example.com",
  "password": "securepass123",
  "age": 28
}`,
  },
};

function formatPath(instancePath: string, missingProperty?: string): string {
  if (missingProperty) {
    return instancePath
      ? `data${instancePath}.${missingProperty}`
      : `data.${missingProperty}`;
  }
  return instancePath ? `data${instancePath}` : "data";
}

export function translateAjvError(error: ErrorObject): string {
  const { keyword, params, message } = error;
  const actualType = params.type as string | undefined;
  const missing = params.missingProperty as string | undefined;
  const format = params.format as string | undefined;
  const limit = params.limit as number | undefined;

  switch (keyword) {
    case "type":
      if (actualType === "integer") {
        return "The value must be a whole number (integer), but you provided a text string.";
      }
      if (actualType === "number") {
        return "The value must be a number, but you provided a different type.";
      }
      if (actualType === "string") {
        return "The value must be a string (text).";
      }
      return `The value must be a ${actualType ?? "valid type"}.`;
    case "required":
      return `The '${missing}' field is required but missing.`;
    case "format":
      if (format === "email") {
        return "The value must be a valid email address.";
      }
      return `The value must match format "${format}".`;
    case "minimum":
      return `The value must be at least ${limit}.`;
    case "maximum":
      return `The value must be at most ${limit}.`;
    case "minLength":
      return `This text must have at least ${limit} characters.`;
    case "maxLength":
      return `This text must have at most ${limit} characters.`;
    case "minItems":
      return `This array must have at least ${limit} items.`;
    case "enum":
      return `The value must be one of the allowed options.`;
    default:
      return message ?? "Validation failed for this field.";
  }
}

function getAjv(draft: SchemaDraft): typeof draft7Ajv {
  return draft === "draft-2020-12" ? draft2020Ajv : draft7Ajv;
}

export function validateJsonSchema(
  schemaText: string,
  dataText: string,
  draft: SchemaDraft = "draft-7",
): JsonSchemaValidationResult {
  let schema: unknown;
  let data: unknown;

  try {
    schema = JSON.parse(schemaText);
  } catch (e) {
    return {
      valid: false,
      errors: [],
      schemaError: (e as Error).message,
      dataError: null,
    };
  }

  try {
    data = JSON.parse(dataText);
  } catch (e) {
    return {
      valid: false,
      errors: [],
      schemaError: null,
      dataError: (e as Error).message,
    };
  }

  const ajv = getAjv(draft);
  let validate: ValidateFunction;

  try {
    validate = ajv.compile(schema as object);
  } catch (e) {
    return {
      valid: false,
      errors: [],
      schemaError: (e as Error).message,
      dataError: null,
    };
  }

  const valid = validate(data) as boolean;

  if (valid) {
    return { valid: true, errors: [], schemaError: null, dataError: null };
  }

  const errors: ValidationError[] = (validate.errors ?? []).map((err) => ({
    path: formatPath(err.instancePath, err.params?.missingProperty as string),
    message: err.message ?? "Validation error",
    plainEnglish: translateAjvError(err),
  }));

  return { valid: false, errors, schemaError: null, dataError: null };
}

export function prettyPrintJson(text: string): string {
  return JSON.stringify(JSON.parse(text), null, 2);
}
