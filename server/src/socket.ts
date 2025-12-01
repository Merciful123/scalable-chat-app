import type { Socket,Server } from "socket.io";
// import prisma from "./config/db.config.js";
import { produceMessage } from "./config/kafka.consumer.js";


interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
   
  io.use((socket: CustomSocket, next)=> {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if(!room){
      return next(new Error("Invalid room"))
    }
    socket.room = room;
    next();
  });


  io.on("connection", (socket: CustomSocket) => {

    // join the room

    socket.join(socket?.room!);

    console.log("The socket connected", socket.id);

    socket.on("message", async (data)=>{
      console.log("server side message", data);
     
      // await prisma.chats.create({
      //   data: data
      // })
      
      // commented above to add data from kafka

      await produceMessage(process.env.KAFKA_TOPIC as string, data)

      socket.to(socket.room!).emit("message", data)
      
    })
         
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

  });
}
