// ------------------------------------------------------------
//  widget-entry.tsx — Shadow DOM mount point
//  This is the Vite library entry. All CSS is injected here
//  so it stays 100% inside the shadow root.
// ------------------------------------------------------------


import { createRoot } from 'react-dom/client';
import { ChatProvider } from './state/useChatStore';
import { ChatWindow } from './components/ChatWindow';
import { LauncherButton } from './components/LauncherButton';
import type { ChatConfig } from './types';

// Vite inlines CSS as a string when using ?inline
import widgetCSS from './styles/widget.css?inline';

function App({ config }: { config: ChatConfig }) {
    return (
        <ChatProvider config={config}>
            <ChatWindow />
            <LauncherButton />
        </ChatProvider>
    );
}

let mounted = false;

function mountWidget(config: ChatConfig) {
    if (mounted) return;
    mounted = true;

    // 1. Container div appended to body
    const container = document.createElement('div');
    container.id = 'chatbot-widget-root';
    document.body.appendChild(container);

    // 2. Shadow root for full CSS isolation
    const shadow = container.attachShadow({ mode: 'open' });

    // 3. Inject scoped CSS into shadow root
    const style = document.createElement('style');
    style.textContent = widgetCSS;
    shadow.appendChild(style);

    // 4. Mount React into shadow root
    const mountPoint = document.createElement('div');
    shadow.appendChild(mountPoint);

    createRoot(mountPoint).render(<App config={config} />);
}

// ── Public API ────────────────────────────────────────────────
declare global {
    interface Window {
        ChatBot: {
            init: (config: Partial<ChatConfig> & { apiKey: string }) => void;
        };
    }
}

window.ChatBot = {
    init(userConfig) {
        const config: ChatConfig = {
            apiKey: userConfig.apiKey ?? '',
            botName: userConfig.botName ?? 'Support Assistant',
            themeColor: userConfig.themeColor ?? '#4F46E5',
            position: userConfig.position ?? 'right',
            welcomeMessage:
                userConfig.welcomeMessage ?? 'Hi 👋 How can we help you today?',
        };
        mountWidget(config);
    },
};
