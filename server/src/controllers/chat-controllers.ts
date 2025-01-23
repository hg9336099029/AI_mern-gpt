import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGeminiAI } from "../config/geminiai-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
      return res;
    }

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to Gemini AI API
    const genAI = configureGeminiAI();
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chatResponse = await model.generateContent(message);

    user.chats.push({ content: chatResponse.response.text(), role: "assistant" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: (error as Error).message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: (error as Error).message });
  }
};