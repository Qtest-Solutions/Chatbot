
import type { Message } from '../types';
import { useChatStore } from '../state/useChatStore';

interface Props {
    message: Message;
    isLatest: boolean;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Render simple markdown-ish: **bold**, bullet \n */
function renderContent(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        );
        // Bullet
        if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('✅')) {
            return (
                <div key={i} className="cb-bullet">
                    {rendered}
                </div>
            );
        }
        return (
            <span key={i}>
                {rendered}
                {i < lines.length - 1 && line !== '' && <br />}
            </span>
        );
    });
}

export function MessageBubble({ message, isLatest }: Props) {
    const { state } = useChatStore();
    const isUser = message.role === 'user';

    return (
        <div
            className={`cb-msg-row ${isUser ? 'cb-msg-row--user' : 'cb-msg-row--bot'} ${isLatest ? 'cb-msg-row--latest' : ''}`}
        >
            {!isUser && (
                <div className="cb-msg-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                    </svg>
                </div>
            )}
            <div className="cb-msg-content">
                <div
                    className={`cb-bubble ${isUser ? 'cb-bubble--user' : 'cb-bubble--bot'}`}
                    style={
                        isUser
                            ? { background: state.config.themeColor }
                            : undefined
                    }
                >
                    {renderContent(message.content)}
                </div>
                <span className={`cb-timestamp ${isUser ? 'cb-timestamp--right' : ''}`}>
                    {formatTime(message.timestamp)}
                </span>
            </div>
        </div>
    );
}
