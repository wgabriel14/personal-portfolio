import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  if (!body.accessCode || body.accessCode !== process.env.DEMO_ACCESS_CODE) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  try {
    const res = await fetch("https://api.retellai.com/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_CHAT_AGENT_ID,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Retell create-chat error:", text);
      return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ chat_id: data.chat_id });
  } catch (error) {
    console.error("create-chat route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
