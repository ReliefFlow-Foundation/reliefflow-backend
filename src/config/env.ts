import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(8080),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const raw = schema.parse(process.env);

export const config = {
  nodeEnv: raw.NODE_ENV,
  port: raw.PORT,
  apiPrefix: raw.API_PREFIX,
  corsOrigin: raw.CORS_ORIGIN,
};

// patch: 2026-06-08T19:32:18.461530

// patch: 2026-06-10T04:46:09.230760

// patch: 2026-06-10T21:23:04.615375

// patch: 2026-06-16T10:18:27.692295

// patch: 2026-06-17T19:32:18.461525

// patch: 2026-06-18T12:09:13.846140
