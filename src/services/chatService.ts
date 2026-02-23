// ------------------------------------------------------------
//  chatService.ts — Mock AI response engine
//  Future: replace sendMessage() body with real fetch/WebSocket
// ------------------------------------------------------------

import type { ChatConfig } from '../types';

interface SendMessageOptions {
    message: string;
    sessionId: string;
    config: ChatConfig;
    onChunk?: (chunk: string) => void; // future streaming callback
}

interface BotResponse {
    text: string;
    delay: number; // ms before responding
}

// ── Intent map ──────────────────────────────────────────────
const INTENTS: Array<{ patterns: RegExp[]; responses: string[] }> = [
    {
        patterns: [/^hi\b/i, /^hello\b/i, /^hey\b/i, /^howdy/i, /^greet/i],
        responses: [
            'Hello there! 👋 How can I assist you today?',
            'Hi! Great to see you. What can I help you with?',
            'Hey! I\'m here to help. What\'s on your mind?',
        ],
    },
    {
        patterns: [/price/i, /pricing/i, /cost/i, /plan/i, /subscription/i, /billing/i],
        responses: [
            'We have flexible pricing plans starting from **$29/month** for the Starter plan, all the way to custom Enterprise pricing. Would you like me to walk you through each plan?',
            'Great question! Our plans are:\n\n• **Starter** – $29/mo (5k messages)\n• **Pro** – $79/mo (50k messages)\n• **Enterprise** – Custom\n\nAll plans include a 14-day free trial. 🎉',
        ],
    },
    {
        patterns: [/how.*work/i, /what.*do/i, /feature/i, /capabilities/i, /can you/i],
        responses: [
            'I can help with a wide range of things: answering questions, troubleshooting issues, product guidance, and more. What specific area can I assist you with?',
            'Great question! Here\'s what I can do:\n\n✅ Answer product questions\n✅ Help with troubleshooting\n✅ Guide you through features\n✅ Connect you to a human agent\n\nWhat do you need help with?',
        ],
    },
    {
        patterns: [/support/i, /help/i, /issue/i, /problem/i, /bug/i, /error/i, /fix/i],
        responses: [
            'I\'m sorry to hear you\'re having trouble! Can you describe the issue in a bit more detail? I\'ll do my best to help you resolve it quickly.',
            'Let\'s get that sorted out! Please share more details about the problem and I\'ll guide you through the solution.',
        ],
    },
    {
        patterns: [/human/i, /agent/i, /person/i, /representative/i, /speak.*someone/i, /talk.*someone/i],
        responses: [
            'Of course! I\'ll connect you with a human agent right away. Please hold on for a moment... ⏳\n\nTypically our agents respond within 2–5 minutes during business hours.',
        ],
    },
    {
        patterns: [/thank/i, /thanks/i, /thx/i, /appreciate/i],
        responses: [
            'You\'re very welcome! Is there anything else I can help you with? 😊',
            'Happy to help! Don\'t hesitate to reach out if you have more questions.',
        ],
    },
    {
        patterns: [/bye/i, /goodbye/i, /see you/i, /cya/i],
        responses: [
            'Goodbye! Have a wonderful day! 👋 Feel free to come back anytime.',
            'Take care! We\'re always here if you need us. 😊',
        ],
    },
    {
        patterns: [/demo/i, /trial/i, /free/i, /try/i],
        responses: [
            'Absolutely! You can start a **14-day free trial** with no credit card required. 🎉\n\nJust click the "Start Free Trial" button on our homepage.',
        ],
    },
    {
        patterns: [/integration/i, /api/i, /webhook/i, /connect/i, /embed/i],
        responses: [
            'We support integrations with 100+ tools! Including Slack, Salesforce, HubSpot, Zendesk, and more.\n\nWe also have a full REST API and Webhook support for custom integrations. Would you like the API documentation?',
        ],
    },
];

const FALLBACK_RESPONSES = [
    "I'm still learning, but I want to make sure I give you the right answer. Could you rephrase that or give me a bit more context?",
    "Hmm, I'm not quite sure about that one. Let me flag this for a human agent who can help you better.",
    "That's a great question! I don't have a specific answer for that right now, but I can connect you with our support team.",
    "I may not have the best answer for that yet. Could you try asking in a different way, or would you like to chat with a human agent?",
];

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function matchIntent(text: string): string | null {
    for (const intent of INTENTS) {
        if (intent.patterns.some((p) => p.test(text))) {
            return pick(intent.responses);
        }
    }
    return null;
}

// ── Public API ───────────────────────────────────────────────
// Future: replace this implementation with fetch/WebSocket
export async function sendMessage(opts: SendMessageOptions): Promise<string> {
    const { message } = opts;
    const delay = 1000 + Math.random() * 1000; // 1–2 seconds

    await new Promise((r) => setTimeout(r, delay));

    const response = matchIntent(message) ?? pick(FALLBACK_RESPONSES);
    return response;
}
