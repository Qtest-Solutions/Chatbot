import { useChatStore } from '../state/useChatStore';

export function LauncherButton() {
    const { state, dispatch } = useChatStore();
    const { config, isOpen, unreadCount } = state;

    return (
        <button
            className={`cb-launcher ${isOpen ? 'cb-launcher--open' : ''}`}
            style={{
                [config.position === 'right' ? 'right' : 'left']: '24px',
                background: `linear-gradient(135deg, ${config.themeColor}, ${adjustColor(config.themeColor, -20)})`,
            }}
            onClick={() => dispatch({ type: 'TOGGLE' })}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            {/* Pulse ring (shown when closed + unread) */}
            {!isOpen && unreadCount > 0 && <span className="cb-launcher-pulse" />}

            {/* Icon */}
            <span className="cb-launcher-icon">
                {isOpen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </span>

            {/* Badge */}
            {!isOpen && unreadCount > 0 && (
                <span className="cb-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
        </button>
    );
}

/** Slightly darken/lighten a hex color */
function adjustColor(hex: string, amount: number): string {
    try {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
        const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
        return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    } catch {
        return hex;
    }
}
