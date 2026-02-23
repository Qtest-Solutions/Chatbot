
export function TypingIndicator() {
    return (
        <div className="cb-msg-row cb-msg-row--bot">
            <div className="cb-msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                </svg>
            </div>
            <div className="cb-msg-content">
                <div className="cb-bubble cb-bubble--bot cb-typing-bubble">
                    <span className="cb-dot" />
                    <span className="cb-dot" />
                    <span className="cb-dot" />
                </div>
            </div>
        </div>
    );
}
