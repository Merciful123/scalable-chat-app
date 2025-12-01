import prisma from "./db.config.js";
import { consumer, producer } from "./kafka.producer.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};


export const consumeMessages = async (topic: string) => {
 
    await consumer.connect();

    await consumer.subscribe({ topic: topic });

  await consumer.run({ eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message?.value?.toString() ?? "");
      console.log({
        partition,
        offset: message.offset,
        value: data,
      });

      await prisma.chats.create({
        data: data,
      });

      // Process the message (e.g., save to DB, trigger some action, etc.)
    },
  });
};
