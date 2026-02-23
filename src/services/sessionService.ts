// ------------------------------------------------------------
//  sessionService.ts — session ID management
//  Future: add auth token, user identity, etc.
// ------------------------------------------------------------

const SESSION_KEY = 'chatbot_session_id';

function generateId(): string {
    return 'sess_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

export function getSessionId(): string {
    try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) return stored;
        const newId = generateId();
        sessionStorage.setItem(SESSION_KEY, newId);
        return newId;
    } catch {
        return generateId();
    }
}

export function generateMessageId(): string {
    return 'msg_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}
