"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, RotateCcw, Linkedin } from "lucide-react";

interface Message {
  role: "user" | "agent";
  content: string;
}

type Status = "idle" | "loading" | "sending" | "error";

const SESSION_KEY = "demo_access_code";

export default function ChatDemo() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const messagesRef = useRef<HTMLDivElement>(null);

  // Access code state — shared session key with VoiceDemo
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [codeChecking, setCodeChecking] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      setAccessCode(saved);
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    setCodeError("");
    setCodeChecking(true);

    try {
      const res = await fetch("/api/retell/create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: accessCode.trim() }),
      });

      if (res.status === 401) {
        setCodeError("Incorrect access code.");
        setCodeChecking(false);
        return;
      }

      if (!res.ok) throw new Error();

      const data = await res.json();
      sessionStorage.setItem(SESSION_KEY, accessCode.trim());
      setUnlocked(true);
      setCodeChecking(false);
      setChatId(data.chat_id);
    } catch {
      setCodeError("Something went wrong. Please try again.");
      setCodeChecking(false);
    }
  };

  const startChat = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/retell/create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });

      if (res.status === 401) {
        sessionStorage.removeItem(SESSION_KEY);
        setUnlocked(false);
        setAccessCode("");
        setStatus("idle");
        return;
      }

      if (!res.ok) throw new Error();
      const data = await res.json();
      setChatId(data.chat_id);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const resetChat = () => {
    setChatId(null);
    setMessages([]);
    setInput("");
    setStatus("idle");
  };

  const sendMessage = async () => {
    if (!input.trim() || !chatId || status === "sending") return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStatus("sending");

    try {
      const res = await fetch("/api/retell/chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, content: userMessage.content }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "agent", content: data.reply }]);
      }
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Locked ──
  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center h-[420px] gap-4 bg-[#141414] border border-[#1e1e1e] rounded-2xl px-6">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
          <Linkedin size={26} className="text-[#a0a0a0]" />
        </div>
        <p className="text-[#f5f5f5] text-sm font-medium text-center">
          Want to try the chat demo?
        </p>
        <p className="text-[#a0a0a0] text-xs text-center leading-relaxed">
          Send me a message on LinkedIn and I&apos;ll send you the access code.
        </p>
        <a
          href="https://linkedin.com/in/williams-reyes-0584b91a8"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs py-2.5 bg-[#00d4ff] text-[#0a0a0a] rounded-xl font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors text-center"
        >
          Message me on LinkedIn
        </a>
        {!showCodeInput ? (
          <button
            onClick={() => setShowCodeInput(true)}
            className="text-[#555] hover:text-[#a0a0a0] text-xs transition-colors"
          >
            Already have the code?
          </button>
        ) : (
          <form onSubmit={handleUnlock} className="flex flex-col gap-2 w-full max-w-xs">
            <input
              type="text"
              value={accessCode}
              onChange={(e) => { setAccessCode(e.target.value); setCodeError(""); }}
              placeholder="Enter access code"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#f5f5f5] text-sm placeholder-[#555] focus:outline-none focus:border-[#00d4ff]/50 text-center tracking-widest"
              autoComplete="off"
              autoFocus
            />
            {codeError && <p className="text-red-400 text-xs text-center">{codeError}</p>}
            <button
              type="submit"
              disabled={codeChecking || !accessCode.trim()}
              className="w-full py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] rounded-xl text-sm hover:border-[#00d4ff]/50 hover:text-[#f5f5f5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {codeChecking ? "Verifying..." : "Start Chat"}
            </button>
          </form>
        )}
      </div>
    );
  }

  // ── Idle / not started ──
  if (!chatId && status !== "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-[420px] gap-5 bg-[#141414] border border-[#1e1e1e] rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
          <MessageSquare size={28} className="text-[#00d4ff]" />
        </div>
        <div className="text-center">
          <p className="text-[#f5f5f5] text-sm font-medium mb-1">Chat with the AI agent</p>
          <p className="text-[#555] text-xs">Powered by Retell AI</p>
        </div>
        {status === "error" && (
          <p className="text-red-400 text-xs">Connection failed. Please try again.</p>
        )}
        <button
          onClick={startChat}
          className="px-6 py-2.5 bg-[#00d4ff] text-[#0a0a0a] rounded-xl font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors"
        >
          Start Chat
        </button>
      </div>
    );
  }

  // ── Loading ──
  if (status === "loading" && !chatId) {
    return (
      <div className="flex items-center justify-center h-[420px] bg-[#141414] border border-[#1e1e1e] rounded-2xl text-[#a0a0a0] text-sm">
        <span className="animate-pulse">Starting chat...</span>
      </div>
    );
  }

  // ── Active chat ──
  return (
    <div className="flex flex-col h-[420px] bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[#a0a0a0] text-xs">AI Agent · Online</span>
        </div>
        <button onClick={resetChat} title="End chat" className="text-[#555] hover:text-[#a0a0a0] transition-colors">
          <RotateCcw size={14} />
        </button>
      </div>

      <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#555] text-sm">
            Say hello to get started
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[#00d4ff] text-[#0a0a0a] rounded-br-sm" : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] rounded-bl-sm"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {status === "sending" && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#a0a0a0] rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-[#a0a0a0] rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-[#a0a0a0] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {status === "error" && (
        <div className="px-4 py-2 bg-red-900/30 border-t border-red-800/50 flex items-center justify-between">
          <span className="text-red-400 text-xs">Something went wrong.</span>
          <button onClick={() => setStatus("idle")} className="text-red-400 text-xs underline">Retry</button>
        </div>
      )}

      <div className="border-t border-[#1e1e1e] p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={status === "sending"}
          className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#555] focus:outline-none focus:border-[#00d4ff]/50 disabled:opacity-50 transition-colors"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || status === "sending"}
          className="w-10 h-10 flex items-center justify-center bg-[#00d4ff] rounded-xl text-[#0a0a0a] hover:bg-[#00d4ff]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
