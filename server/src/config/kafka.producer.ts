import { Kafka, logLevel } from "kafkajs";
import env from "dotenv";
env.config();


const redpanda = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  logLevel: logLevel.ERROR

})

export const producer = redpanda.producer();

export const consumer = redpanda.consumer({groupId: process.env.KAFKA_TOPIC!});


export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};
