import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGeminiAI } from "../config/geminiai-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
      return;
    }

    const chats = user.chats.map(
      ({ role, content }: { role: string; content: string }) => ({
        role,
        content,
      })
    );

    chats.push({ content: message, role: "user" });
    user.chats.push({
      content: message,
      role: "user",
      id: "",
    });

    const genAI = configureGeminiAI();
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chatResponse = await model.generateContent(
      chats.map((chat) => chat.content)
    );

    user.chats.push({
      content: chatResponse.response.text(),
      role: "assistant",
      id: "",
    });

    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
      return;
    }

    res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
      return;
    }

    user.chats = [];
    await user.save();
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};
