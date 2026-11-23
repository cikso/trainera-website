import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appLoginUrl } from "@/lib/site";

/**
 * Public privacy policy (trainera.ai/privacy). Indexable.
 *
 * CHANGES TO THIS FILE NEED THE OWNER'S APPROVAL (.github/CODEOWNERS): it is
 * a legal document and customer contracts point at it.
 *
 * THE FACTS HERE ARE PROMISES. Every statement about what we collect, who
 * receives it and where it is kept must match the platform and the provider
 * list we give customers (Attachment A of the due diligence workbook). When a
 * provider is added, removed or moved, change PROVIDERS and LAST_UPDATED in
 * the same change.
 *
 * PROVIDERS ARE DESCRIBED BY WHAT THEY DO AND WHERE, NEVER BY COMPANY NAME
 * (founder decision, 18 November 2026: the stack is not published). The
 * Privacy Act asks for the countries information goes to, not the companies.
 * Customers get the named list in confidence (the page promises it on
 * request; Honey's is Attachment A of its agreement). Google
 * is the one name on the page, because the sign in button already says it.
 *
 * Copy follows the public site rule: no dashes and no hyphenated words.
 */
export const metadata: Metadata = {
  title: "Privacy policy | Trainera",
  description:
    "How Trainera collects, uses, stores and protects personal information, including practice call recordings, and how to ask for access or make a complaint.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "19 November 2026";

/** The mailbox privacy questions and requests go to. */
const PRIVACY_EMAIL = "privacy@trainera.ai";

const PROVIDERS: { kind: string; does: string; where: string }[] = [
  {
    kind: "Database and file storage",
    does: "Our database, sign in and file storage. This is where your information is kept.",
    where: "Australia (Sydney)",
  },
  {
    kind: "Application hosting",
    does: "Runs the Trainera application.",
    where: "Australia (Sydney). Its global network delivers web pages.",
  },
  {
    kind: "Cache",
    does: "A short lived cache that keeps conversations fast. It holds no recordings.",
    where: "Australia (Sydney)",
  },
  {
    kind: "AI model",
    does: "Plays the AI customer, scores practice conversations and writes feedback. The provider does not use what we send it for training, and does not keep it, apart from content its safety systems flag as breaking its usage rules.",
    where: "United States. A request may pass through its data centres in other regions.",
  },
  {
    kind: "Backup AI model",
    does: "Takes over if our main AI provider is unavailable. It stores nothing.",
    where: "Australia (Sydney and Melbourne)",
  },
  {
    kind: "Voice and pictures",
    does: "The voice in practice calls and course voiceovers. The provider deletes each practice call within one day, and its backups clear within a further 30 days. It does not use our content for training. It also draws the pictures on course slides, using image models from other companies, from a one sentence description we write that never contains names or anything from your course.",
    where: "United States. A request may also be processed in the European Union or Singapore.",
  },
  {
    kind: "Pictures",
    does: "Draws the pictures on course slides when our voice provider can't, from the same one sentence description, which never contains names or anything from your course.",
    where: "United States. The image model it uses may run in other countries.",
  },
  {
    kind: "Presenter video",
    does: "An optional presenter video for courses. The provider receives course narration only, never practice calls.",
    where: "United States",
  },
  {
    kind: "Email delivery",
    does: "Sends our emails, such as invitations, reminders and certificates.",
    where: "United States",
  },
  {
    kind: "Error monitoring",
    does: "Reports technical errors so we can fix them. Reports exclude what you type and say.",
    where: "Germany",
  },
  {
    kind: "Google sign in",
    does: "Only if you choose to sign in with Google.",
    where: "Global",
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-8">
      <h2 className="font-display text-[22px] leading-tight font-bold tracking-[-0.01em]">
        {title}
      </h2>
      <div className="text-foreground/90 mt-4 space-y-4 text-[15px] leading-7 break-words">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const CONTENTS: [string, string][] = [
  ["who-we-are", "Who we are"],
  ["who-this-covers", "Who this policy covers"],
  ["what-we-collect", "What we collect"],
  ["how-we-collect", "How we collect it"],
  ["how-we-use", "How we use it"],
  ["ai", "How we use AI"],
  ["sharing", "Who we share it with"],
  ["location", "Where it is kept"],
  ["security", "How we protect it"],
  ["retention", "How long we keep it"],
  ["cookies", "Cookies"],
  ["your-rights", "Access and correction"],
  ["complaints", "Complaints"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background min-h-svh px-[5vw] py-8">
      <div className="mx-auto max-w-[1240px]">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center" aria-label="Trainera home">
            <BrandMark size="sm" />
          </Link>
          {/* Log in is on the app's own address (see lib/site.ts). */}
          <a
            href={appLoginUrl()}
            className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors"
          >
            Log in
          </a>
        </header>

        <article className="mx-auto mt-14 max-w-[760px] min-w-0 lg:mt-20">
          <span className="section-label text-accent-foreground">Privacy</span>
          <h1 className="font-display mt-4 text-[clamp(30px,3.2vw,44px)] leading-[1.08] font-bold tracking-[-0.02em] text-pretty">
            Privacy policy
          </h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated {LAST_UPDATED}
          </p>

          <p className="mt-8 text-base leading-7 break-words">
            Trainera is a training platform where people practise customer
            conversations with AI customers and get feedback. This policy
            explains what personal information we handle, why, where it is
            kept, and what you can ask us to do with it.
          </p>

          <nav
            aria-label="Contents"
            className="bg-secondary mt-8 rounded-[10px] border p-5"
          >
            <p className="section-label text-muted-foreground">On this page</p>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
              {CONTENTS.map(([id, label]) => (
                <li key={id} className="min-w-0">
                  <a
                    href={`#${id}`}
                    className="text-foreground hover:text-accent-foreground underline-offset-4 hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="who-we-are" title="Who we are">
            <p>
              Trainera is operated by Agentic Intel Pty Ltd (ABN 67 700 359
              271), an Australian company based at Level 18, 56 Pitt Street,
              Sydney NSW 2000. In this policy, &ldquo;we&rdquo; and
              &ldquo;us&rdquo; mean that company.
            </p>
            <p>
              We handle personal information in accordance with the Privacy
              Act 1988 (Cth) and the Australian Privacy Principles.
            </p>
          </Section>

          <Section id="who-this-covers" title="Who this policy covers">
            <p>We handle personal information in two different ways.</p>
            <Bullets
              items={[
                <>
                  <strong>For our customers.</strong> Organisations use
                  Trainera to train and assess their people. The organisation
                  decides who is invited, what is uploaded and how long records
                  are kept. We handle that information for the organisation,
                  under our agreement with it. If your employer, a training
                  provider or a recruiter gave you access to Trainera, this is
                  you.
                </>,
                <>
                  <strong>For ourselves.</strong> We handle the details of
                  people who visit our website, ask for a demo or deal with us
                  as a business contact.
                </>,
              ]}
            />
          </Section>

          <Section id="what-we-collect" title="What we collect">
            <p>
              <strong>If you use Trainera through an organisation:</strong>
            </p>
            <Bullets
              items={[
                "Your name, work email address, role and team, and when you sign in.",
                "Your practice conversations. Voice practice calls with an AI customer are recorded and written out as a transcript. Typed practice chats are saved as you write them.",
                "The scores, feedback and coaching notes the platform produces from those conversations.",
                "Your learning records, such as lessons completed, quiz and exam answers and results, and certificates.",
                "Questions you ask the Knowledge Hub, and the answers given.",
                "Notes and highlights you save while studying. These are private to you.",
                "Records of activity in your organisation's workspace, kept for security and audit.",
              ]}
            />
            <p>
              <strong>If you take an assessment as a job candidate,</strong> we
              collect the name you enter, your assessment conversations and
              your results, for the organisation that invited you.
            </p>
            <p>
              <strong>If you contact us or ask for a demo,</strong> we collect
              the details you give us: your name, work email address, company,
              and, if you choose, your job title, team size, phone number and
              message.
            </p>
            <p>
              <strong>Recordings of real customer calls.</strong> An
              organisation can choose to upload recordings of its own customer
              calls for coaching. Those recordings can include personal
              information about the people on the call. This feature is
              switched off unless the organisation has asked for it, and we
              handle those recordings only on its instructions.
            </p>
            <p>
              <strong>What we do not collect.</strong> We do not take or store
              payment card details. We do not create voiceprints or any other
              biometric profile from recordings. We do not use advertising
              trackers.
            </p>
          </Section>

          <Section id="how-we-collect" title="How we collect it">
            <Bullets
              items={[
                "From you, when you sign in, take part in training or contact us.",
                "From your organisation, when it invites you or uploads training material.",
                "From the service you sign in with, such as Google or your organisation's single sign on, which gives us your name and email address.",
                "Automatically, such as the time you sign in and basic technical details like your browser type and IP address.",
              ]}
            />
            <p>
              You can browse our website without telling us who you are. To use
              the training platform you need an account, because your results
              and certificates belong to you.
            </p>
          </Section>

          <Section id="how-we-use" title="How we use it">
            <Bullets
              items={[
                "To provide the training: running practice conversations, scoring them and giving you feedback.",
                "To show your progress and results to you, and to the administrators and managers of your organisation.",
                "To issue certificates and send emails about your training, such as invitations and reminders.",
                "To give support, keep the platform secure and fix faults.",
                "To reply when you contact us or ask for a demo, and to stay in touch about Trainera. You can ask us to stop at any time.",
                "To meet our legal obligations.",
              ]}
            />
            <p>
              We do not sell personal information. We do not use it for
              advertising. We do not use our customers&rsquo; content or
              personal information to train AI models. The AI and voice
              providers that process your conversations do not use them to
              train their models either.
            </p>
          </Section>

          <Section id="ai" title="How we use AI">
            <p>
              AI is at the centre of Trainera, so it is worth being plain about
              what it does.
            </p>
            <Bullets
              items={[
                "The customer you talk to in a practice conversation is an AI character. It is not a real person.",
                "AI scores your practice conversation against the scorecard your organisation has chosen, and writes feedback. Each score points to what was said in the conversation, so it can be checked.",
                "Scores and feedback are a training aid. They can be wrong. Your organisation's managers can review any conversation and have it scored again.",
                "Decisions about your employment are made by your organisation, not by Trainera. Our agreements say that AI output must not be the only basis for a decision about a person's employment.",
              ]}
            />
          </Section>

          <Section id="sharing" title="Who we share it with">
            <p>We share personal information only in these cases.</p>
            <Bullets
              items={[
                <>
                  <strong>Your organisation.</strong> Its administrators and
                  managers can see the training records and results of the
                  people they invited.
                </>,
                <>
                  <strong>Our service providers.</strong> The providers in the
                  table below help us run Trainera. Each receives only what it
                  needs to do its job. We give our customer organisations
                  the full list by name, in confidence, when they ask.
                </>,
                <>
                  <strong>When the law requires it,</strong> such as a court
                  order or a lawful request from a regulator.
                </>,
                <>
                  <strong>If our business changes hands.</strong> If Trainera
                  is sold or merged, information may pass to the new owner, who
                  must keep protecting it as this policy describes.
                </>,
              ]}
            />
            <div className="mt-2 rounded-[10px] border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Service</TableHead>
                    <TableHead className="min-w-[260px]">What the provider does</TableHead>
                    <TableHead className="min-w-[170px]">Where</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROVIDERS.map((p) => (
                    <TableRow key={p.kind}>
                      <TableCell className="align-top font-medium whitespace-normal">
                        {p.kind}
                      </TableCell>
                      <TableCell className="align-top whitespace-normal">
                        {p.does}
                      </TableCell>
                      <TableCell className="align-top whitespace-normal">
                        {p.where}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          <Section id="location" title="Where it is kept">
            <p>
              Your information is stored in Sydney, Australia. That includes
              your account, your practice call recordings and transcripts, your
              scores and your learning records.
            </p>
            <p>
              Some of it is sent overseas for a short time so that a provider
              can do its work. The AI model and the voice service process
              conversations in the United States, and may pass a request
              through their data centres in other regions. Our email and error
              monitoring providers keep limited records in the United States
              and Germany. The table above shows what goes where.
            </p>
            <p>
              Before we use a provider we check how it protects information,
              and we send it only what it needs, over encrypted connections.
            </p>
          </Section>

          <Section id="security" title="How we protect it">
            <Bullets
              items={[
                "Information is encrypted when it travels and when it is stored.",
                "Each organisation's information is kept separate from every other organisation's.",
                "Recordings and training files are private. They can be opened only by people with permission.",
                "Administrators and managers must use a second sign in step, and an organisation can require its own single sign on.",
                "Very few of our own staff can reach customer information, and each time they do is logged.",
              ]}
            />
            <p>
              No system is perfectly secure. If a data breach is likely to
              cause serious harm, we will tell the people affected and the
              Office of the Australian Information Commissioner, as the law
              requires. Where the information belongs to a customer
              organisation, we will also tell that organisation promptly.
            </p>
          </Section>

          <Section id="retention" title="How long we keep it">
            <Bullets
              items={[
                "Training records are kept for as long as your organisation uses Trainera, or for a shorter period if it chooses one.",
                "When an organisation stops using Trainera, we delete its information within 30 days, unless we have agreed something else with it. Copies in backups clear within a further 7 days.",
                "The voice service deletes each practice call within one day, and its backups clear within a further 30 days.",
                "Records of emails we send are kept by our email provider for 30 days, and technical error reports for up to 90 days.",
                "Demo requests and business contacts are kept while we are in touch with you. Ask us and we will delete them.",
              ]}
            />
          </Section>

          <Section id="cookies" title="Cookies">
            <p>
              We use only the cookies needed to keep you signed in and to keep
              your session secure. Your browser also remembers a few
              preferences, such as where you were up to in a lesson. We do not
              use advertising or analytics cookies.
            </p>
          </Section>

          <Section id="your-rights" title="Access and correction">
            <p>
              You can ask for a copy of the personal information we hold about
              you, and ask us to correct it if it is wrong.
            </p>
            <Bullets
              items={[
                "If you use Trainera through an organisation, the quickest way is to ask that organisation, because it controls your training records. You can also ask us, and we will work with the organisation to respond.",
                "For anything else, contact us using the details below.",
              ]}
            />
            <p>
              We will reply within 30 days. There is no charge for asking. If
              we cannot give you what you ask for, we will tell you why.
            </p>
          </Section>

          <Section id="complaints" title="Complaints">
            <p>
              If you think we have mishandled your personal information, please
              tell us first, in writing, using the details below. We will
              give you our answer within 30 days.
            </p>
            <p>
              If you are not satisfied with our answer, you can complain to the
              Office of the Australian Information Commissioner at{" "}
              <a
                href="https://www.oaic.gov.au/privacy/privacy-complaints"
                className="text-foreground font-medium underline underline-offset-4"
              >
                oaic.gov.au
              </a>{" "}
              or by calling 1300 363 992.
            </p>
          </Section>

          <Section id="changes" title="Changes to this policy">
            <p>
              We update this policy when the way we handle information changes.
              The date at the top shows when it was last changed. If a change
              is significant, we will tell our customer organisations before it
              takes effect.
            </p>
          </Section>

          <Section id="contact" title="Contact us">
            <p>For any privacy question, request or complaint:</p>
            <p>
              Privacy Officer
              <br />
              Agentic Intel Pty Ltd, trading as Trainera
              <br />
              Level 18, 56 Pitt Street, Sydney NSW 2000
              <br />
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="text-foreground font-medium underline underline-offset-4"
              >
                {PRIVACY_EMAIL}
              </a>
            </p>
          </Section>
        </article>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <BrandMark size="sm" />
          <span className="text-muted-foreground text-xs break-words">
            © 2026 Trainera. AI training for teams that talk to customers.
          </span>
        </footer>
      </div>
    </main>
  );
}
