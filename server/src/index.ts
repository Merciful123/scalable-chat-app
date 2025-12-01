import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";
import {Server} from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
import { consumeMessages } from "./config/kafka.consumer.js";
import { connectKafkaProducer } from "./config/kafka.producer.js";



const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin: ["http://localhost:3000", "https://admin.socket.io", "https://scalable-chat-app-1-hm6l.onrender.com" ],
    credentials: true
  },         
  adapter: createAdapter(redis)
});

instrument(io, {
  auth: false,
  mode: "development",
});


setupSocket(io);



// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working");
});

app.use("/api", Routes);


// added kafka from here

connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages("quick-chat-messages").catch((err) => console.log("The Kafka Consume error", err)
);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


export {io};
