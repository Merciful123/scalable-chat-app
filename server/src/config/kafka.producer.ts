import { Kafka, logLevel } from "kafkajs";
import env from "dotenv";
env.config();

const kafka = new Kafka({
  //@ts-expect-error
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  //@ts-expect-error
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId: process.env.KAFKA_TOPIC! });

export const connectKafkaProducer = async () => {
  
  try {
  
    await producer.connect();
    console.log("Kafka Producer connected...");
  
  } catch (error) {
    console.log("kafka produce connection  error: - ", error)
  }
};
