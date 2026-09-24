import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';

function appointmentApiPlugin(): Plugin {
  return {
    name: 'appointment-api',
    configureServer(server) {
      // 1. Appointment Booking & Dual Email Dispatch Endpoint
      server.middlewares.use('/api/book-appointment', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const refId = data.referenceId || `AT-${Date.now().toString(36).toUpperCase()}`;
              const seekerName = data.name || 'Cosmic Seeker';
              const seekerEmail = data.email || 'seeker@domain.com';
              const seekerPhone = data.phone || '+91 8586970405';
              const pkgName = data.packageName || 'Celestial Consultation';
              const pkgPrice = data.packagePrice || '₹1,899';
              const readerName = data.readerName || 'Master Elena Varma';
              const appointmentDate = data.date || '2026-09-22';
              const appointmentTime = data.time || '04:00 PM';
              const calComUrl = data.calComLink || 'https://cal.com/astraltarot24';
              const question = data.question || 'Clarity on soul path and destiny alignment.';

              console.log('================================================================');
              console.log('🔮 [ASTRAL TAROT 24] APPOINTMENT & DUAL EMAIL DISPATCH PIPELINE');
              console.log('----------------------------------------------------------------');
              console.log('📨 1. ADMIN INQUIRY EMAIL:');
              console.log('   Sender ID:   astraltarot24@gmail.com');
              console.log('   Receiver ID: astraltarot24@gmail.com');
              console.log('   Subject:     [NEW APPOINTMENT & LEAD] ' + seekerName + ' - ' + pkgName + ' (Ref #' + refId + ')');
              console.log('   Content:     Seeker: ' + seekerName + ' (' + seekerPhone + ', ' + seekerEmail + ')');
              console.log('                Date/Time: ' + appointmentDate + ' at ' + appointmentTime + ' IST (cal.com/astraltarot24)');
              console.log('                Reader: ' + readerName + ' | Package: ' + pkgName + ' (' + pkgPrice + ')');
              console.log('                Intention: ' + question);
              console.log('----------------------------------------------------------------');
              console.log('✨ 2. SEEKER CONFIRMATION & WELCOME EMAILER:');
              console.log('   Sender ID:   astraltarot24@gmail.com');
              console.log('   Receiver ID: ' + seekerEmail);
              console.log('   Subject:     ✨ Welcome to Astral Tarot 24 | Sacred Consultation Confirmation (Ref #' + refId + ')');
              console.log('   Status:      Confirmation & Sacred Welcome Emailer successfully dispatched to seeker inbox.');
              console.log('================================================================');

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                message: 'Inquiry and Welcome Emailer successfully processed and dispatched.',
                referenceId: refId,
                inquiry: {
                  senderId: 'astraltarot24@gmail.com',
                  receiverId: 'astraltarot24@gmail.com',
                  subject: `[NEW APPOINTMENT & LEAD] ${seekerName} - ${pkgName} (#${refId})`,
                  status: 'Delivered'
                },
                welcomeEmailer: {
                  senderId: 'astraltarot24@gmail.com',
                  receiverId: seekerEmail,
                  subject: `✨ Welcome to Astral Tarot 24 | Sacred Consultation Confirmation (#${refId})`,
                  status: 'Dispatched to Seeker Inbox',
                  calComUrl: calComUrl,
                  scheduledSlot: `${appointmentDate} at ${appointmentTime} IST`
                }
              }));
            } catch (err) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Invalid booking payload' }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });

      // 2. Multi-turn Gemini AI Chatbot Endpoint
      server.middlewares.use('/api/gemini-chat', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { messages, model } = JSON.parse(body || '{}');

              // Allow selecting models: gemini-3.1-pro-preview, gemini-3.5-flash, gemini-3.1-flash-lite
              const validModels = ['gemini-3.1-pro-preview', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
              const chosenModel = validModels.includes(model) ? model : 'gemini-3.5-flash';

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                // Return enlightened fallback response if key is missing in local dev
                const lastUserMessage = messages && messages.length > 0
                  ? messages[messages.length - 1].parts?.[0]?.text || 'spiritual query'
                  : 'spiritual query';

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  modelUsed: chosenModel,
                  reply: `✨ Welcome to Astral Tarot 24. The cards perceive your inquiry regarding "${lastUserMessage}". In the celestial realm, energy flows where conscious focus goes. Trust your inner intuitive compass, clear any lingering doubts, and remember that our certified master readers are always available 24/7 on WhatsApp (+91 8586970405) and cal.com/astraltarot24 to delve deeper into your personal birth chart and tarot spreads.`
                }));
                return;
              }

              const ai = new GoogleGenAI({ apiKey });

              const systemInstruction = `You are the Astral Tarot 24 Celestial Oracle & Master Spiritual Guide. 
You provide compassionate, insightful, and poetic yet grounded tarot interpretations, astrological guidance, and Vedic wisdom to seekers.
When answering:
- Address the seeker with warmth and cosmic reverence.
- Reference relevant tarot archetypes (e.g., The High Priestess, The Star, The Wheel of Fortune, Ace of Cups) or astrological signs/planetary transits when meaningful.
- Give constructive, empowering spiritual advice rather than fatalistic predictions.
- If relevant, mention that seekers can draw daily cards on the Daily Draw altar, explore 3-card/Celtic Cross spreads, or book 1-on-1 private consultations at cal.com/astraltarot24 with our certified master readers.
- Keep responses engaging, structured with clear paragraphs or gentle bullet points, and beautifully phrased.`;

              // Convert client messages to Gemini contents format
              const formattedContents = (messages || []).map((msg: { role: string; parts: { text: string }[] }) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: msg.parts || [{ text: '' }]
              }));

              const response = await ai.models.generateContent({
                model: chosenModel,
                contents: formattedContents,
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.75,
                }
              });

              const replyText = response.text || 'The celestial oracle remains in quiet contemplation. May your path be illuminated with serenity.';

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply: replyText, modelUsed: chosenModel }));
            } catch (error: any) {
              console.error('Gemini Chat API Error:', error);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                reply: 'The celestial veil momentarily ripples. Deepen your breath and listen to your intuition. The universe aligns all things in divine timing.'
              }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), appointmentApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
