import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";
// Create the Chat schema
const chatSchema = new Schema({
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
const userSchema = new Schema({
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
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.js.map