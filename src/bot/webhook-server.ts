import 'dotenv/config';
import express from 'express';
import { WhatsAppProvider } from './whatsapp-provider.js';
import { coordinator } from './conversation-coordinator.js';
import { IncomingMessage } from './messaging-service.js';

const app = express();
app.use(express.json()); // Meta sends JSON

const whatsappProvider = new WhatsAppProvider();

// 1. Webhook Verification (Handshake)
app.get('/whatsapp/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// 2. Message Handling
app.post('/whatsapp/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const msg = body.entry[0].changes[0].value.messages[0];
      const from = msg.from;
      const messageId = msg.id;

      const incoming: IncomingMessage = {
        from: from,
        platform: 'whatsapp',
        messageId: messageId,
        timestamp: parseInt(msg.timestamp),
      };

      if (msg.type === 'text') {
        incoming.text = msg.text.body;
      } else if (msg.type === 'image') {
        incoming.mediaUrl = msg.image.id; // Meta uses IDs, downloadMedia will handle it
        incoming.mediaType = 'photo';
        if (msg.image.caption) incoming.text = msg.image.caption;
      } else if (msg.type === 'document') {
        incoming.mediaUrl = msg.document.id;
        incoming.mediaType = 'document';
      } else if (msg.type === 'audio' || msg.type === 'voice') {
        incoming.voiceId = msg.audio ? msg.audio.id : msg.voice.id;
        incoming.voiceType = msg.type === 'audio' ? 'audio' : 'voice';
      }

      await coordinator.handleMessage(incoming, whatsappProvider);
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});

export { app };
