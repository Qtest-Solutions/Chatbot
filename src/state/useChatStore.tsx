// ------------------------------------------------------------
//  useChatStore.tsx — Global state via React Context + useReducer
// ------------------------------------------------------------

import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
} from 'react';
import type { ChatAction, ChatConfig, ChatState, Message } from '../types';
import { getSessionId, generateMessageId } from '../services/sessionService';
import { sendMessage } from '../services/chatService';

// ── Reducer ───────────────────────────────────────────────────
function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case 'OPEN':
            return { ...state, isOpen: true, isMinimized: false, unreadCount: 0 };
        case 'CLOSE':
            return { ...state, isOpen: false, isMinimized: false };
        case 'MINIMIZE':
            return { ...state, isMinimized: true, isOpen: false };
        case 'TOGGLE':
            if (state.isOpen) return { ...state, isOpen: false, isMinimized: false };
            return { ...state, isOpen: true, isMinimized: false, unreadCount: 0 };
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_TYPING':
            return { ...state, isTyping: action.payload };
        case 'RESET_UNREAD':
            return { ...state, unreadCount: 0 };
        case 'INCREMENT_UNREAD':
            return { ...state, unreadCount: state.unreadCount + 1 };
        case 'SET_CONFIG':
            return { ...state, config: action.payload };
        default:
            return state;
    }
}

function buildWelcomeMessage(config: ChatConfig): Message {
    return {
        id: generateMessageId(),
        role: 'bot',
        content: config.welcomeMessage,
        timestamp: new Date(),
    };
}

function createInitialState(config: ChatConfig): ChatState {
    return {
        isOpen: false,
        isMinimized: false,
        messages: [buildWelcomeMessage(config)],
        isTyping: false,
        sessionId: getSessionId(),
        unreadCount: 0,
        config,
    };
}

// ── Context ───────────────────────────────────────────────────
interface ChatContextValue {
    state: ChatState;
    dispatch: React.Dispatch<ChatAction>;
    sendUserMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────
export function ChatProvider({
    config,
    children,
}: {
    config: ChatConfig;
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(
        chatReducer,
        config,
        createInitialState
    );

    const sendUserMessage = useCallback(
        async (text: string) => {
            if (!text.trim()) return;

            const userMsg: Message = {
                id: generateMessageId(),
                role: 'user',
                content: text.trim(),
                timestamp: new Date(),
            };

            dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
            dispatch({ type: 'SET_TYPING', payload: true });

            try {
                const responseText = await sendMessage({
                    message: text,
                    sessionId: state.sessionId,
                    config: state.config,
                });

                const botMsg: Message = {
                    id: generateMessageId(),
                    role: 'bot',
                    content: responseText,
                    timestamp: new Date(),
                };

                dispatch({ type: 'SET_TYPING', payload: false });
                dispatch({ type: 'ADD_MESSAGE', payload: botMsg });

                if (!state.isOpen) {
                    dispatch({ type: 'INCREMENT_UNREAD' });
                }
            } catch {
                dispatch({ type: 'SET_TYPING', payload: false });
                const errMsg: Message = {
                    id: generateMessageId(),
                    role: 'bot',
                    content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
                    timestamp: new Date(),
                };
                dispatch({ type: 'ADD_MESSAGE', payload: errMsg });
            }
        },
        [state.sessionId, state.config, state.isOpen]
    );

    return (
        <ChatContext.Provider value={{ state, dispatch, sendUserMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────
export function useChatStore(): ChatContextValue {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatStore must be used within ChatProvider');
    return ctx;
}
