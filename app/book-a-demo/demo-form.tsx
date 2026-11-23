"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DEMO_REQUEST_ENDPOINT } from "@/lib/site";

/**
 * Team-size bands. The app checks the same list (lib/demo-request.ts in the
 * app repo): a band it doesn't know is dropped, so keep the two in step.
 */
const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Requests from a test copy of this site (a Vercel preview or your own
 * computer) still reach the real inbox, so they are labelled: the email's
 * subject starts with "[Test]". Only the live site sends unlabelled requests.
 */
const SOURCE =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "book-a-demo" : "test site";

const FAILED =
  "Something went wrong on our side. Please email tom@trainera.ai directly and we'll pick it up straight away.";

/**
 * Send the form to the Trainera app. Never throws: a failed network call
 * comes back as an error sentence for the form to show.
 */
async function sendDemoRequest(
  body: Record<string, string>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(DEMO_REQUEST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;
    if (res.ok && data?.ok) return { ok: true };
    return { ok: false, error: data?.error || FAILED };
  } catch {
    return { ok: false, error: FAILED };
  }
}

/** The one required-field marker. Muted, never orange — the submit button is
 *  this view's single accent. */
function Req() {
  return (
    <span className="text-muted-foreground font-normal" aria-hidden="true">
      *
    </span>
  );
}

export function DemoForm() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, start] = useTransition();

  /** Mirrors the server schema. The server is the wall; this is just so a
   *  prospect never waits on a round trip to be told a field is empty. */
  const validate = (): string | null => {
    if (fullName.trim().length < 2) return "Please tell us your name.";
    if (fullName.trim().length > 120) return "That name is too long.";
    if (!EMAIL_RE.test(workEmail.trim()) || workEmail.trim().length > 200)
      return "Please enter a valid work email address.";
    if (company.trim().length < 2) return "Please tell us your company name.";
    if (company.trim().length > 160) return "That company name is too long.";
    if (jobTitle.trim().length > 120) return "That job title is too long.";
    if (phone.trim().length > 40) return "That phone number is too long.";
    if (message.trim().length > 2000)
      return "Please keep your message under 2000 characters.";
    return null;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    const email = workEmail.trim();
    start(async () => {
      const res = await sendDemoRequest({
        full_name: fullName,
        work_email: workEmail,
        company,
        job_title: jobTitle,
        team_size: teamSize,
        phone,
        message,
        source: SOURCE,
        website,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSentTo(email);
    });
  };

  if (sentTo) {
    return (
      <div className="space-y-4 text-center">
        <span className="bg-band-pass-tint text-band-pass mx-auto flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-6" />
        </span>
        <div className="space-y-2">
          <h2 className="font-display text-[26px] leading-tight font-[650] tracking-[-0.01em]">
            Thanks, we&apos;ll be in touch
          </h2>
          <p className="text-muted-foreground text-sm leading-6 break-words">
            We&apos;ve got your details and someone will reply to{" "}
            <span className="text-foreground font-medium">{sentTo}</span>,
            usually within one business day.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft />
            Back to the homepage
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Honeypot. Off-screen rather than display:none — hidden inputs are the
          first thing a bot skips, and screen readers get aria-hidden. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="full_name" className="gap-1">
            Your name <Req />
          </Label>
          <Input
            id="full_name"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Nguyen"
            autoComplete="name"
            maxLength={120}
            required
            disabled={pending}
          />
        </div>
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="work_email" className="gap-1">
            Work email <Req />
          </Label>
          <Input
            id="work_email"
            name="work_email"
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="alex@yourcompany.com.au"
            autoComplete="email"
            maxLength={200}
            required
            disabled={pending}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="company" className="gap-1">
            Company <Req />
          </Label>
          <Input
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your company"
            autoComplete="organization"
            maxLength={160}
            required
            disabled={pending}
          />
        </div>
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="job_title">Job title</Label>
          <Input
            id="job_title"
            name="job_title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Head of Contact Centre"
            autoComplete="organization-title"
            maxLength={120}
            disabled={pending}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="team_size">Team size</Label>
          <Select
            value={teamSize}
            onValueChange={setTeamSize}
            disabled={pending}
          >
            <SelectTrigger id="team_size" className="w-full">
              <SelectValue placeholder="How many agents?" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZES.map((band) => (
                <SelectItem key={band} value={band}>
                  {band.replace("–", " to ")} agents
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
            autoComplete="tel"
            maxLength={40}
            disabled={pending}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-1.5">
        <Label htmlFor="message">What would you like to see?</Label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hiring, onboarding or ongoing coaching? Tell us what matters most and we'll shape the demo around it."
          maxLength={2000}
          rows={4}
          disabled={pending}
        />
      </div>

      {error && (
        <p role="alert" className="text-destructive text-sm break-words">
          {error}
        </p>
      )}

      {/* The landing page's orange button: dark text on orange. The app's default
          primary (white on orange) is only 2.6:1, below AA, on this public page. */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#f7841e] text-[#211f1c] hover:bg-[#ee7614]"
        disabled={pending}
      >
        {pending && <Loader2 className="animate-spin" />}
        {pending ? "Sending…" : "Request a demo"}
      </Button>

      <p className="text-muted-foreground text-xs leading-5">
        We&apos;ll only use these details to get in touch about Trainera.
        Fields marked with an asterisk are required.
      </p>
    </form>
  );
}
