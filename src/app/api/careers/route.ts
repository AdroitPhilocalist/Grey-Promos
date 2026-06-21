import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maximumResumeSize = 5 * 1024 * 1024;
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function textValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  const recipient = process.env.CAREERS_RECIPIENT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!recipient || !from || !apiKey) {
    return NextResponse.json({ error: "The careers mailbox is not configured yet. Please contact Grey Promos directly." }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const fields = {
      name: textValue(formData.get("name")),
      email: textValue(formData.get("email")),
      phone: textValue(formData.get("phone")),
      city: textValue(formData.get("city")),
      role: textValue(formData.get("role")),
      experience: textValue(formData.get("experience")),
      availability: textValue(formData.get("availability")),
      message: textValue(formData.get("message")),
    };
    const resume = formData.get("resume");

    if (Object.values(fields).some((value) => !value) || !(resume instanceof File)) {
      return NextResponse.json({ error: "Please complete every field and attach your resume." }, { status: 400 });
    }

    if (resume.size === 0 || resume.size > maximumResumeSize || !allowedResumeTypes.has(resume.type)) {
      return NextResponse.json({ error: "Please attach a PDF, DOC, or DOCX resume under 5 MB." }, { status: 400 });
    }

    const resumeContent = Buffer.from(await resume.arrayBuffer()).toString("base64");
    const rows = [
      ["Name", fields.name], ["Email", fields.email], ["Phone", fields.phone], ["City", fields.city],
      ["Interested in", fields.role], ["Experience", fields.experience], ["Availability", fields.availability], ["Note", fields.message],
    ].map(([label, value]) => `<tr><td style="padding:8px 14px 8px 0;color:#6b7280;font-weight:600;vertical-align:top">${label}</td><td style="padding:8px 0;color:#17120f">${escapeHtml(value)}</td></tr>`).join("");

    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: fields.email,
        subject: `Career application: ${fields.name} - ${fields.role}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px"><h1 style="color:#15120f">New Grey Promos application</h1><table style="border-collapse:collapse;font-size:15px">${rows}</table><p style="margin-top:28px;color:#6b7280">The candidate's resume is attached to this email.</p></div>`,
        attachments: [{ filename: resume.name, content: resumeContent }],
      }),
    });

    if (!delivery.ok) {
      console.error("Resend careers delivery failed", await delivery.text());
      return NextResponse.json({ error: "We could not send your application. Please try again shortly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Careers form error", error);
    return NextResponse.json({ error: "We could not process your application. Please try again." }, { status: 500 });
  }
}
