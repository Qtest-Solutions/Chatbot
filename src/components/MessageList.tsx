import React, { useRef, useEffect } from 'react';
import { useChatStore } from '../state/useChatStore';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickReplies } from './QuickReplies';

export function MessageList() {
    const { state } = useChatStore();
    const { messages, isTyping } = state;
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages or typing change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, isTyping]);

    return (
        <div className="cb-messages">
            {messages.map((msg, i) => (
                <React.Fragment key={msg.id}>
                    <MessageBubble message={msg} isLatest={i === messages.length - 1 && !isTyping} />
                    {/* Show quick replies only after the first (welcome) bot message */}
                    {i === 0 && msg.role === 'bot' && messages.length === 1 && (
                        <QuickReplies />
                    )}
                </React.Fragment>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
        </div>
    );
}
