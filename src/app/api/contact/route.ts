import { NextResponse } from "next/server";

export const runtime = "nodejs";

const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "connect@greypromosindia.com";

function textValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        } as Record<string, string>
      )[character] || character
  );
}

export async function POST(request: Request) {
  const from = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!from || !apiKey) {
    return NextResponse.json(
      { error: "The contact mailbox is not configured yet. Please email connect@greypromosindia.com directly." },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const fields = {
      name: textValue(formData.get("name")),
      email: textValue(formData.get("email")),
      service: textValue(formData.get("service")),
      message: textValue(formData.get("message")),
    };

    if (Object.values(fields).some((value) => !value)) {
      return NextResponse.json(
        { error: "Please complete every field before sending." },
        { status: 400 }
      );
    }

    const rows = [
      ["Name", fields.name],
      ["Email", fields.email],
      ["Service", fields.service],
      ["Message", fields.message],
    ]
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 14px 8px 0;color:#6b7280;font-weight:600;vertical-align:top">${label}</td><td style="padding:8px 0;color:#15120f">${escapeHtml(
            value
          )}</td></tr>`
      )
      .join("");

    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: fields.email,
        subject: `New inquiry from ${fields.name} — ${fields.service}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px"><h1 style="color:#15120f">New Grey Promos India inquiry</h1><table style="border-collapse:collapse;font-size:15px">${rows}</table></div>`,
      }),
    });

    if (!delivery.ok) {
      console.error("Resend contact delivery failed", await delivery.text());
      return NextResponse.json(
        { error: "We could not send your inquiry. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { error: "We could not send your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
