
import { useChatStore } from '../state/useChatStore';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
    const { state } = useChatStore();
    const { isOpen, config } = state;

    if (!isOpen) return null;

    return (
        <div
            className="cb-window"
            style={{
                [config.position === 'right' ? 'right' : 'left']: '24px',
            }}
            role="dialog"
            aria-label="Chat window"
        >
            <ChatHeader />
            <MessageList />
            <ChatInput />
        </div>
    );
}
