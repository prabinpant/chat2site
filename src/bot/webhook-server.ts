import express from 'express';
import { WhatsAppProvider } from './whatsapp-provider.js';
import { coordinator } from './conversation-coordinator.js';
import { IncomingMessage } from './messaging-service.js';

const app = express();
app.use(express.urlencoded({ extended: false }));

const whatsappProvider = new WhatsAppProvider();

app.post('/whatsapp/webhook', async (req, res) => {
  const { Body, From, MessageSid, NumMedia } = req.body;
  
  const message: IncomingMessage = {
    from: From,
    text: Body,
    platform: 'whatsapp',
    messageId: MessageSid,
    timestamp: Date.now(),
  };

  if (parseInt(NumMedia) > 0) {
    message.mediaUrl = req.body.MediaUrl0;
    message.mediaType = 'photo'; // Simplified
  }

  await coordinator.handleMessage(message, whatsappProvider);
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});

export { app };
