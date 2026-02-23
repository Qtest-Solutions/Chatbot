import { useChatStore } from '../state/useChatStore';

export function ChatHeader() {
    const { state, dispatch } = useChatStore();
    const { config } = state;

    return (
        <div
            className="cb-header"
            style={{ background: `linear-gradient(135deg, ${config.themeColor} 0%, ${shiftHue(config.themeColor)} 100%)` }}
        >
            {/* Avatar + Info */}
            <div className="cb-header-info">
                <div className="cb-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                    </svg>
                    <span className="cb-online-dot" />
                </div>
                <div className="cb-header-text">
                    <p className="cb-header-name">{config.botName}</p>
                    <p className="cb-header-status">
                        <span className="cb-status-dot" />
                        Online · Typically replies instantly
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="cb-header-controls">
                <button
                    className="cb-icon-btn"
                    onClick={() => dispatch({ type: 'MINIMIZE' })}
                    aria-label="Minimize"
                    title="Minimize"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
                <button
                    className="cb-icon-btn"
                    onClick={() => dispatch({ type: 'CLOSE' })}
                    aria-label="Close"
                    title="Close"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function shiftHue(hex: string): string {
    try {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, ((num >> 16) & 0xff) - 30);
        const g = Math.max(0, ((num >> 8) & 0xff) - 10);
        const b = Math.min(255, (num & 0xff) + 40);
        return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    } catch {
        return hex;
    }
}
