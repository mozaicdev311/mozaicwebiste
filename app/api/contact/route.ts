import { NextResponse } from "next/server"
import { Resend } from "resend"

import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
  contactInquirySchema,
} from "@/lib/contact"

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = contactInquirySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "The request is missing required contact details.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? "MOZAIC Contact <onboarding@resend.dev>"

  if (!resendApiKey || !to) {
    return NextResponse.json(
      {
        error: "Contact delivery is not configured yet.",
      },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)
  const data = parsed.data

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: buildContactEmailSubject(data),
      text: buildContactEmailText(data),
      html: buildContactEmailHtml(data),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      {
        error: "We could not send your brief right now. Please try again shortly.",
      },
      { status: 500 }
    )
  }
}
