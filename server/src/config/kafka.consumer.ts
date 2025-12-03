import prisma from "./db.config.js";
import { consumer, producer } from "./kafka.producer.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const consumeMessages = async (topic: string) => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: topic });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const raw = JSON.parse(message?.value?.toString() ?? "");
        // console.log({
        //   partition,
        //   offset: message.offset,
        //   value: raw,
        // });

        const clean = {
          group_id: raw.group_id,
          message: raw.message,
          name: raw.name,
          file: raw.file ?? null,
          // Let Postgres handle created_at automatically
        };

        const groupExists = await prisma.chatGroup.findUnique({
          where: { id: raw.group_id },
        });

        if (!groupExists) {
          console.error("Group does not exist:", raw.group_id);
          return;
        }

        await prisma.chats.create({ data: clean });


        // Process the message (e.g., save to DB, trigger some action, etc.)
      },
    });
  } catch (error) {
    console.log("kafka consume error: -", error);
  }
};
