import mongoose, { Document, Schema } from "mongoose";
import { randomUUID } from "crypto";

// Define the Chat interface
interface Chat {
  id: string;
  role: string;
  content: string;
}

// Define the User interface extending Mongoose's Document
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  chats: Chat[];
}

// Create the Chat schema
const chatSchema = new Schema<Chat>({
  id: {
    type: String,
    default: () => randomUUID(), // Use a function for default values
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Create the User schema
const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema], // Reference the chatSchema
});

// Export the User model with the correct type
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
