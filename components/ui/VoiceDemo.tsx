"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, PhoneOff, Lock } from "lucide-react";

type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

interface TranscriptEntry {
  role: "agent" | "user";
  content: string;
}

const SESSION_KEY = "demo_access_code";

export default function VoiceDemo() {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isTalking, setIsTalking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Access code state
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [codeChecking, setCodeChecking] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retellClientRef = useRef<any>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  // Restore session unlock on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      setAccessCode(saved);
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [transcript]);

  useEffect(() => {
    return () => {
      retellClientRef.current?.stopCall();
    };
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    setCodeError("");
    setCodeChecking(true);

    // Validate the code by attempting the call creation — no extra endpoint needed.
    // A 401 means wrong code; success means we proceed directly to the call.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setCodeError("Microphone access denied. Please allow microphone and try again.");
      setCodeChecking(false);
      return;
    }

    setStatus("connecting");

    try {
      const res = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: accessCode.trim() }),
      });

      if (res.status === 401) {
        setCodeError("Incorrect access code.");
        setCodeChecking(false);
        setStatus("idle");
        return;
      }

      if (!res.ok) throw new Error("Failed to create web call");

      // Code is valid — persist for the session and start the call
      sessionStorage.setItem(SESSION_KEY, accessCode.trim());
      setUnlocked(true);
      setCodeChecking(false);

      const data = await res.json();
      await launchRetellCall(data.access_token);
    } catch (err) {
      console.error("unlock error:", err);
      setCodeError("Something went wrong. Please try again.");
      setCodeChecking(false);
      setStatus("idle");
    }
  };

  const startCall = async () => {
    setErrorMsg("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setErrorMsg("Microphone access denied. Please allow microphone and try again.");
      setStatus("error");
      return;
    }

    setStatus("connecting");

    try {
      const res = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });

      if (res.status === 401) {
        // Session code is stale — force re-unlock
        sessionStorage.removeItem(SESSION_KEY);
        setUnlocked(false);
        setAccessCode("");
        setStatus("idle");
        return;
      }

      if (!res.ok) throw new Error("Failed to create web call");
      const data = await res.json();
      await launchRetellCall(data.access_token);
    } catch (err) {
      console.error("startCall error:", err);
      setErrorMsg("Failed to start call. Please try again.");
      setStatus("error");
    }
  };

  const launchRetellCall = async (access_token: string) => {
    const { RetellWebClient } = await import("retell-client-js-sdk");
    const client = new RetellWebClient();
    retellClientRef.current = client;

    client.on("call_started", () => {
      setStatus("active");
      client.startAudioPlayback().catch(() => {});
    });

    client.on("call_ready", () => {
      client.startAudioPlayback().catch(() => {});
    });

    client.on("call_ended", () => {
      setStatus("ended");
      setIsTalking(false);
    });

    client.on("agent_start_talking", () => setIsTalking(true));
    client.on("agent_stop_talking", () => setIsTalking(false));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.on("update", (update: any) => {
      if (update?.transcript) {
        setTranscript(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          update.transcript.map((t: any) => ({
            role: t.role as "agent" | "user",
            content: t.content,
          }))
        );
      }
    });

    client.on("error", (err: unknown) => {
      console.error("Retell client error:", err);
      setErrorMsg("Call error. Please try again.");
      setStatus("error");
    });

    await client.startCall({ accessToken: access_token });
  };

  const endCall = () => {
    retellClientRef.current?.stopCall();
    retellClientRef.current = null;
    setStatus("ended");
    setIsTalking(false);
  };

  const reset = () => {
    setStatus("idle");
    setTranscript([]);
    setErrorMsg("");
    setIsTalking(false);
  };

  return (
    <div className="flex flex-col h-[420px] bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">

        {/* ── Locked state ── */}
        {!unlocked ? (
          <form onSubmit={handleUnlock} className="flex flex-col items-center gap-4 w-full max-w-xs">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <Lock size={28} className="text-[#a0a0a0]" />
            </div>
            <p className="text-[#a0a0a0] text-sm text-center">
              Enter the access code to try the voice demo
            </p>
            <input
              ref={codeInputRef}
              type="text"
              value={accessCode}
              onChange={(e) => { setAccessCode(e.target.value); setCodeError(""); }}
              placeholder="Access code"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#f5f5f5] text-sm placeholder-[#555] focus:outline-none focus:border-[#00d4ff]/50 text-center tracking-widest"
              autoComplete="off"
            />
            {codeError && (
              <p className="text-red-400 text-xs text-center">{codeError}</p>
            )}
            <button
              type="submit"
              disabled={codeChecking || !accessCode.trim()}
              className="w-full py-2.5 bg-[#00d4ff] text-[#0a0a0a] rounded-xl font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {codeChecking ? "Verifying..." : "Unlock & Start Call"}
            </button>
          </form>

        ) : status === "idle" || status === "ended" || status === "error" ? (

          /* ── Unlocked / idle ── */
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <Mic size={32} className="text-[#a0a0a0]" />
            </div>
            {status === "ended" && <p className="text-[#a0a0a0] text-sm">Call ended</p>}
            {errorMsg && <p className="text-red-400 text-sm text-center max-w-xs">{errorMsg}</p>}
            <button
              onClick={status === "ended" || status === "error" ? reset : startCall}
              className="px-6 py-2.5 bg-[#00d4ff] text-[#0a0a0a] rounded-xl font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors"
            >
              {status === "ended" || status === "error" ? "Start New Call" : "Start Call"}
            </button>
          </div>

        ) : status === "connecting" ? (

          /* ── Connecting ── */
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-[#00d4ff]/40 border-t-[#00d4ff] animate-spin" />
            <p className="text-[#a0a0a0] text-sm">Connecting...</p>
          </div>

        ) : (

          /* ── Active call ── */
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full ${isTalking ? "animate-ping bg-[#00d4ff]/20" : ""}`} />
              <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors ${isTalking ? "border-[#00d4ff] bg-[#00d4ff]/10" : "border-[#2a2a2a] bg-[#1a1a1a]"}`}>
                <Mic size={32} className={isTalking ? "text-[#00d4ff]" : "text-[#a0a0a0]"} />
              </div>
            </div>
            {isTalking && <p className="text-[#00d4ff] text-sm animate-pulse">Agent is speaking...</p>}
            {transcript.length > 0 && (
              <div ref={transcriptRef} className="w-full max-h-40 overflow-y-auto space-y-2 px-2">
                {transcript.map((entry, i) => (
                  <div key={i} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-1.5 rounded-xl text-xs ${entry.role === "user" ? "bg-[#00d4ff] text-[#0a0a0a]" : "bg-[#1e1e1e] text-[#f5f5f5]"}`}>
                      {entry.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={endCall}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <PhoneOff size={16} />
              End Call
            </button>
          </div>
        )}
      </div>

      {/* Footer status bar */}
      <div className="border-t border-[#1e1e1e] px-4 py-2 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-400 animate-pulse" : status === "connecting" ? "bg-yellow-400 animate-pulse" : status === "error" ? "bg-red-400" : "bg-[#333]"}`} />
        <span className="text-[#555] text-xs capitalize">{unlocked ? status : "locked"}</span>
      </div>
    </div>
  );
}
