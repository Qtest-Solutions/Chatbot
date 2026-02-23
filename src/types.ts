export interface ChatConfig {
    apiKey: string;
    botName: string;
    themeColor: string;
    position: 'left' | 'right';
    welcomeMessage: string;
}

export type MessageRole = 'user' | 'bot';

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
}

export interface ChatState {
    isOpen: boolean;
    isMinimized: boolean;
    messages: Message[];
    isTyping: boolean;
    sessionId: string;
    unreadCount: number;
    config: ChatConfig;
}

export type ChatAction =
    | { type: 'OPEN' }
    | { type: 'CLOSE' }
    | { type: 'MINIMIZE' }
    | { type: 'TOGGLE' }
    | { type: 'ADD_MESSAGE'; payload: Message }
    | { type: 'SET_TYPING'; payload: boolean }
    | { type: 'RESET_UNREAD' }
    | { type: 'INCREMENT_UNREAD' }
    | { type: 'SET_CONFIG'; payload: ChatConfig };
