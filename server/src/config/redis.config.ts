import {Redis} from "ioredis";
import env from "dotenv";
env.config();


const redis = new Redis({
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT) ?? 6379,
  password: process.env.REDIS_PASSWORD ?? undefined,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
});

export default redis;