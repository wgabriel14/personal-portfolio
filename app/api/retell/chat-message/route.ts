import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  chat_id: z.string().min(1),
  content: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { chat_id, content } = parsed.data;

    const res = await fetch("https://api.retellai.com/create-chat-completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
      },
      body: JSON.stringify({ chat_id, content }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Retell chat-message error:", text);
      return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }

    const data = await res.json();
    const messages: { role: string; content: string }[] = data.messages ?? [];
    const agentMessage = [...messages].reverse().find((m) => m.role === "agent");

    return NextResponse.json({ reply: agentMessage?.content ?? "" });
  } catch (error) {
    console.error("chat-message route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
