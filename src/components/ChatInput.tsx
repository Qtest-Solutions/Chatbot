import React, { useRef, useState, useCallback } from 'react';
import { useChatStore } from '../state/useChatStore';

export function ChatInput() {
    const { state, sendUserMessage } = useChatStore();
    const { isTyping, config } = state;
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = useCallback(() => {
        const text = value.trim();
        if (!text || isTyping) return;
        sendUserMessage(text);
        setValue('');
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [value, isTyping, sendUserMessage]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        // Auto-grow
        const ta = e.target;
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    };

    return (
        <div className="cb-input-area">
            <div className="cb-input-wrapper">
                <textarea
                    ref={textareaRef}
                    className="cb-textarea"
                    placeholder="Type a message…"
                    value={value}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={isTyping}
                    aria-label="Type a message"
                />
                <button
                    className="cb-send-btn"
                    style={{
                        background: value.trim() && !isTyping
                            ? config.themeColor
                            : undefined,
                    }}
                    onClick={handleSend}
                    disabled={!value.trim() || isTyping}
                    aria-label="Send message"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
            <p className="cb-powered-by">
                Powered by <span>ChatBot</span> AI
            </p>
        </div>
    );
}
