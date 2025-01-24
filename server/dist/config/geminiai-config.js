import { GoogleGenerativeAI } from "@google/generative-ai";
/**
 * Configures and initializes the Google Generative AI instance.
 *
 * @throws {Error} If the GEMINI_API_KEY environment variable is not defined.
 * @returns {GoogleGenerativeAI} An instance of the Google Generative AI client.
 */
export const configureGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
    }
    // Instantiate the Google Generative AI client with the provided API key
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI;
};
//# sourceMappingURL=geminiai-config.js.map