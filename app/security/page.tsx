import { Bullets, ContentPage, Section, TextLink } from "@/components/content-page";
import { pageMetadata } from "@/lib/site";

/**
 * Security and data (trainera.ai/security). Indexable.
 *
 * Every statement here must stay true in the app, and must agree with the
 * privacy policy (app/privacy/page.tsx), which most of it repeats in plainer
 * order for a customer's security team. Never name an outside company
 * (README rule 5): providers are described by what they do and where.
 * Change this page and the privacy policy together.
 *
 * Statements added here that the privacy policy does not make (approved by
 * the owner before this page went live): the daily database backup kept in
 * Sydney, the 24 hour recovery aim and the yearly restore test (the app's
 * docs/disaster-recovery-plan.md); the automatic library checks (the app's
 * dependency check workflow); and security reports to the privacy mailbox.
 */
const TITLE = "Security and data | Trainera";
const DESCRIPTION =
  "Where Trainera keeps your data, who can see it, how sign in is protected, what our AI and voice providers can and cannot do with your conversations, and how to reach us about security.";

export const metadata = pageMetadata("/security", TITLE, DESCRIPTION);

const PRIVACY_EMAIL = "privacy@trainera.ai";

export default function SecurityPage() {
  return (
    <ContentPage
      label="Security"
      title="Security and data"
      intro={
        <p>
          Trainera holds your people&apos;s practice calls, scores and training records. This page explains
          where that information is kept, who can see it and how we look after it. The{" "}
          <TextLink href="/privacy">privacy policy</TextLink> has the full detail.
        </p>
      }
    >
      <Section id="where" title="Where your data is kept">
        <Bullets
          items={[
            "Your Trainera database and uploaded files are stored in Australia, in Sydney.",
            "The Trainera application runs in Sydney, and so does the short lived cache that keeps conversations fast. The cache holds no recordings.",
            "To run practice calls and score them, conversations are processed by our AI and voice providers in the United States. If our main AI provider is unavailable, a backup in Sydney and Melbourne takes over, and it stores nothing.",
          ]}
        />
        <p>
          The privacy policy lists every provider by what it does and where it works. We give customers the
          full list by name, in confidence, when they ask.
        </p>
      </Section>

      <Section id="separate" title="Each organisation is kept separate">
        <p>
          Each organisation&apos;s information is kept separate from every other organisation&apos;s. Inside
          your organisation, you decide who sees results for each training plan: managers only, the score only,
          or full feedback for the learner.
        </p>
        <p>
          Recordings and training files are private. They can be opened only by people with permission.
        </p>
      </Section>

      <Section id="sign-in" title="Signing in">
        <Bullets
          items={[
            "Administrators and managers must use a second sign in step, a code from an authenticator app on their phone.",
            "Your organisation can use its own single sign on, and can require it, so your people sign in the same way they do at work.",
          ]}
        />
      </Section>

      <Section id="protect" title="How we protect it">
        <Bullets
          items={[
            "Information is encrypted when it travels and when it is stored.",
            "Very few of our own staff can reach customer information, and each time they do is logged.",
            "Before we use a provider we check how it protects information, and we send it only what it needs, over encrypted connections.",
            "Our technical error reports exclude what you type and say.",
            "The software libraries Trainera is built on are checked automatically for known security problems on every change and every week.",
          ]}
        />
      </Section>

      <Section id="ai" title="AI and your conversations">
        <Bullets
          items={[
            "We do not use our customers' content or personal information to train AI models. The AI and voice providers that process your conversations do not use them to train their models either.",
            "Our voice provider deletes each practice call within one day, and its backups clear within a further 30 days.",
            "Scores and feedback are a training aid. Managers can review any conversation and have it scored again. Decisions about a person's employment are made by your organisation, not by Trainera.",
          ]}
        />
      </Section>

      <Section id="backups" title="Backups and recovery">
        <p>
          Our database is backed up every day, and the backups are kept in Sydney. Our recovery plan aims to
          restore it within 24 hours of a failure, and we test a full restore at least once every 12 months.
        </p>
      </Section>

      <Section id="keep" title="How long we keep it">
        <Bullets
          items={[
            "Training records are kept for as long as your organisation uses Trainera, or for a shorter period if it chooses one.",
            "When an organisation stops using Trainera, we delete its information within 30 days, unless we have agreed something else with it. Copies in backups clear within a further 7 days.",
            "Records of emails we send are kept by our email provider for 30 days, and technical error reports for up to 90 days.",
          ]}
        />
      </Section>

      <Section id="breach" title="If something goes wrong">
        <p>
          No system is perfectly secure. If a data breach is likely to cause serious harm, we will tell the
          people affected and the Office of the Australian Information Commissioner, as the law requires. Where
          the information belongs to a customer organisation, we will also tell that organisation promptly.
        </p>
      </Section>

      <Section id="contact" title="For your security team">
        <p>
          We are happy to answer your security questionnaire and talk your team through how Trainera works. To
          ask a question, or to report a security problem you have found, email{" "}
          <a
            href={`mailto:${PRIVACY_EMAIL}`}
            className="text-foreground font-medium underline underline-offset-4"
          >
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
