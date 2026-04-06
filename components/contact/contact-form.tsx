"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  CONTACT_BUDGET_RANGES,
  CONTACT_PROJECT_TYPES,
  CONTACT_TIMELINES,
  type ContactInquiry,
  contactInquirySchema,
} from "@/lib/contact"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const defaultValues: ContactInquiry = {
  name: "",
  email: "",
  company: "",
  projectType: "brand-product-launch",
  budgetRange: "",
  timeline: "",
  brief: "",
  readyToBook: false,
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<ContactInquiry>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues,
  })

  async function onSubmit(values: ContactInquiry) {
    setSubmitted(false)

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null

    if (!response.ok) {
      toast.error(payload?.error ?? "Something failed while sending your brief. Please try again.")
      return
    }

    form.reset(defaultValues)
    setSubmitted(true)
    toast.success("Brief received. We will get back to you soon.")

    if (values.readyToBook) {
      document.getElementById("schedule-call")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="border border-white/15 bg-black/60 p-6 md:p-8">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Intake_Form // Qualified briefs only
        </div>
        <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] font-medium text-white">
          Tell us what you are building.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-white/60">
          Give us the situation, the constraint, and what is on the line. We will reply with the sharpest next step.
        </p>
      </div>

      {submitted && (
        <div className="mb-8 border border-emerald-400/30 bg-emerald-400/8 px-4 py-4 text-sm text-emerald-200">
          Brief received. If you are ready to move fast, the scheduling block below is the fastest path into a call.
        </div>
      )}

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-none border-white/20 bg-white/[0.02] text-white placeholder:text-white/25"
                      placeholder="Your name"
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="h-12 rounded-none border-white/20 bg-white/[0.02] text-white placeholder:text-white/25"
                      placeholder="you@company.com"
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Company or brand
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 rounded-none border-white/20 bg-white/[0.02] text-white placeholder:text-white/25"
                      placeholder="Company or brand"
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Project type
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-none border-white/20 bg-white/[0.02] text-white">
                        <SelectValue placeholder="Choose a project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-white/20 bg-black text-white">
                      {CONTACT_PROJECT_TYPES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Budget range
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-none border-white/20 bg-white/[0.02] text-white">
                        <SelectValue placeholder="Choose a range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-white/20 bg-black text-white">
                      {CONTACT_BUDGET_RANGES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Timeline
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-none border-white/20 bg-white/[0.02] text-white">
                        <SelectValue placeholder="Choose a timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-white/20 bg-black text-white">
                      {CONTACT_TIMELINES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-mono text-[11px]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="brief"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Brief
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={7}
                    className="rounded-none border-white/20 bg-white/[0.02] text-white placeholder:text-white/25"
                    placeholder="Stage, constraints, timeline, and what is at stake."
                  />
                </FormControl>
                <FormDescription className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Enough context for a useful first reply.
                </FormDescription>
                <FormMessage className="font-mono text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readyToBook"
            render={({ field }) => (
              <FormItem className="border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                      className="mt-0.5 rounded-none border-white/30 data-[state=checked]:border-[#00FF66] data-[state=checked]:bg-[#00FF66] data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
                      I am ready to book a call
                    </FormLabel>
                    <FormDescription className="mt-2 text-sm leading-relaxed text-white/45">
                      Check this if you want us to push you straight toward the scheduling block after submission.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage className="font-mono text-[11px]" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              Secure channel // reply window: 1-2 business days
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-12 rounded-none bg-white px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-black hover:bg-white/90"
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send brief
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
