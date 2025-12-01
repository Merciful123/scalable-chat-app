import {Redis} from "ioredis";
import env from "dotenv";
env.config();


const redis = new Redis({
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
});

export default redis;