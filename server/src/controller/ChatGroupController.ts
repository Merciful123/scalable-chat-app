import type { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {

  static async index(req: Request, res: Response) {
    try {

      const user = req.user;

      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user?.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    
      return res.json({ data: groups });
    
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async show(req: Request, res: Response) {
   
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ data: group });
      }

      return res.status(404).json({ message: "No groups found" });
  
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
  
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        //@ts-expect-error
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user?.id,
        },
      });
  
      return res.json({ message: "Chat Gropu Created successfully!" });
  
    } catch (error) {
  
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

static async update(req: Request, res: Response) {
  
  try {
    const { id } = req.params;
    const { title, passcode } = req.body;

    await prisma.chatGroup.update({
      data: {
        title,
        passcode,
      },
      where: { id },
    });

    return res.json({ message: "Group updated successfully!" });
  
  } catch (error) {
  
    console.log(error);
  
    return res.status(500).json({ message: "Something went wrong!" });
  }
}


  static async destroy(req: Request, res: Response) {
  
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
  
      return res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
  
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatGroupController;
