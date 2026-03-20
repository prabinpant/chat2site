import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  botToken: process.env.BOT_TOKEN,
  netlifyAuthToken: process.env.NETLIFY_AUTH_TOKEN,
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  whatsappApiVersion: process.env.WHATSAPP_API_VERSION || 'v22.0',
  codexModel: process.env.CODEX_MODEL,
  aiEngine: (process.env.AI_ENGINE || 'codex') as 'codex' | 'gemini',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
};

// Validate critical variables
if (!config.botToken) throw new Error('BOT_TOKEN is missing');
if (!config.netlifyAuthToken) throw new Error('NETLIFY_AUTH_TOKEN is missing');
