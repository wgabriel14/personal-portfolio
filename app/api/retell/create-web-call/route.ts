import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  if (!body.accessCode || body.accessCode !== process.env.DEMO_ACCESS_CODE) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  try {
    const res = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_VOICE_AGENT_ID,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Retell create-web-call error:", text);
      return NextResponse.json({ error: "Failed to create web call" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error("create-web-call route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
