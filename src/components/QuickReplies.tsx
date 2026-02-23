import { useChatStore } from '../state/useChatStore';

const QUICK_REPLIES = [
    'How does it work?',
    'See pricing plans',
    'Talk to a human',
    'Start free trial',
];

export function QuickReplies() {
    const { sendUserMessage } = useChatStore();

    return (
        <div className="cb-quick-replies">
            {QUICK_REPLIES.map((reply) => (
                <button
                    key={reply}
                    className="cb-quick-reply-chip"
                    onClick={() => sendUserMessage(reply)}
                >
                    {reply}
                </button>
            ))}
        </div>
    );
}
