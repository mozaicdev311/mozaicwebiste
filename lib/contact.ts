import { z } from "zod"

export const CONTACT_PROJECT_TYPES = [
  { value: "brand-product-launch", label: "Brand + product launch" },
  { value: "website-platform", label: "Website or platform" },
  { value: "automation-ai-systems", label: "Automation or AI systems" },
  { value: "strategy-scoping", label: "Strategy and scoping" },
  { value: "ongoing-partner-support", label: "Ongoing partner support" },
] as const

export const CONTACT_BUDGET_RANGES = [
  { value: "under-10k", label: "Under 10k EUR" },
  { value: "10k-25k", label: "10k to 25k EUR" },
  { value: "25k-50k", label: "25k to 50k EUR" },
  { value: "50k-plus", label: "50k+ EUR" },
  { value: "not-sure-yet", label: "Not sure yet" },
] as const

export const CONTACT_TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "2-4-weeks", label: "2 to 4 weeks" },
  { value: "1-2-months", label: "1 to 2 months" },
  { value: "quarter-plus", label: "Quarter+" },
  { value: "exploring", label: "Just exploring" },
] as const

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(120, "Keep this under 120 characters.").optional().or(z.literal("")),
  projectType: z.enum(CONTACT_PROJECT_TYPES.map((option) => option.value) as [string, ...string[]]),
  budgetRange: z.string().trim().max(60, "Keep this under 60 characters.").optional().or(z.literal("")),
  timeline: z.string().trim().max(60, "Keep this under 60 characters.").optional().or(z.literal("")),
  brief: z.string().trim().min(20, "Tell us a bit more about what you're building.").max(4000, "Keep this under 4000 characters."),
  readyToBook: z.boolean().default(false),
})

export type ContactInquiry = z.infer<typeof contactInquirySchema>

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | undefined
) {
  return options.find((option) => option.value === value)?.label ?? value ?? "Not provided"
}

export function getCalendlyBaseUrl() {
  const value = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()
  return value && value.length > 0 ? value : null
}

export function getCalendlyEmbedUrl(baseUrl: string) {
  const url = new URL(baseUrl)
  url.searchParams.set("hide_event_type_details", "1")
  url.searchParams.set("hide_gdpr_banner", "1")
  url.searchParams.set("background_color", "000000")
  url.searchParams.set("text_color", "ffffff")
  url.searchParams.set("primary_color", "00ff66")
  return url.toString()
}

export function buildContactEmailSubject(data: ContactInquiry) {
  const companyOrName = data.company?.trim() || data.name
  return `New MOZAIC contact: ${labelFor(CONTACT_PROJECT_TYPES, data.projectType)} - ${companyOrName}`
}

export function buildContactEmailText(data: ContactInquiry) {
  return [
    "New MOZAIC contact inquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company?.trim() || "Not provided"}`,
    `Project type: ${labelFor(CONTACT_PROJECT_TYPES, data.projectType)}`,
    `Budget: ${labelFor(CONTACT_BUDGET_RANGES, data.budgetRange)}`,
    `Timeline: ${labelFor(CONTACT_TIMELINES, data.timeline)}`,
    `Ready to book a call: ${data.readyToBook ? "Yes" : "No"}`,
    "",
    "Brief:",
    data.brief,
  ].join("\n")
}

export function buildContactEmailHtml(data: ContactInquiry) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company?.trim() || "Not provided"],
    ["Project type", labelFor(CONTACT_PROJECT_TYPES, data.projectType)],
    ["Budget", labelFor(CONTACT_BUDGET_RANGES, data.budgetRange)],
    ["Timeline", labelFor(CONTACT_TIMELINES, data.timeline)],
    ["Ready to book a call", data.readyToBook ? "Yes" : "No"],
  ]

  return `
    <div style="background:#000;color:#fff;font-family:Inter,Arial,sans-serif;padding:24px">
      <h1 style="font-size:20px;margin:0 0 20px">New MOZAIC contact inquiry</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.56);width:220px">${label}</td>
                  <td style="padding:8px 12px;border:1px solid rgba(255,255,255,0.12)">${value}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <div style="border:1px solid rgba(255,255,255,0.12);padding:16px">
        <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.56);margin-bottom:12px">Brief</div>
        <p style="margin:0;white-space:pre-wrap;line-height:1.7">${data.brief}</p>
      </div>
    </div>
  `
}
