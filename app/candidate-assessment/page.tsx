import { Bullets, ContentPage, Section, Steps, TextLink } from "@/components/content-page";
import { pageMetadata } from "@/lib/site";

/**
 * Candidate assessment (trainera.ai/candidate-assessment). Indexable.
 * Written for people searching for ways to assess candidates for customer
 * service and contact centre roles. Every claim repeats the home page's Hire
 * section (components/landing/premium-page.tsx); keep the two in step, and
 * ask the owner before adding a new claim.
 */
const TITLE = "Candidate call assessments for customer service roles | Trainera";
const DESCRIPTION =
  "Give candidates a realistic customer call before you hire. About 15 minutes on their own phone or laptop, scored out of 100 against your criteria, with strengths and gaps.";

export const metadata = pageMetadata("/candidate-assessment", TITLE, DESCRIPTION);

export default function CandidateAssessmentPage() {
  return (
    <ContentPage
      label="Candidate assessment"
      title="Know they can do the job before you hire them"
      intro={
        <>
          <p>
            An interview tells you how someone talks about customer service. It doesn&apos;t show you how they
            handle an upset customer. Trainera shows you.
          </p>
          <p className="mt-4">
            Candidates take a realistic customer call, the kind they would handle in their first week, from their
            own phone or laptop. It takes about 15 minutes, anywhere, any time.
          </p>
        </>
      }
    >
      <Section title="How it works">
        <Steps
          items={[
            [
              "Set the call",
              "Describe the call or upload a document. Trainera drafts the customer, the situation and clear objectives for the call, and you approve them.",
            ],
            ["Invite candidates", "Candidates scan a code or open a link and start talking."],
            [
              "They take the call",
              "Every candidate speaks to the same AI customer, in the same situation, scored with the same scorecard.",
            ],
            ["See the result", "A score out of 100 for each candidate, with strengths and gaps."],
          ]}
        />
      </Section>

      <Section title="What you see for every candidate">
        <Bullets
          items={[
            "Communication",
            "Listening",
            "Empathy",
            "Problem solving",
            "Accuracy",
            "Staying calm under pressure",
          ]}
        />
        <p>Every score comes with quotes from the call that show why.</p>
      </Section>

      <Section title="Fair to every candidate">
        <p>
          Everyone gets the same customer, the same situation and the same scorecard, so you compare candidates
          fairly and shortlist on evidence instead of gut feel. Decisions about who to hire stay with your team.
        </p>
        <p>
          Candidates also get a realistic preview of the job, so the people who accept know what the work
          involves.
        </p>
      </Section>

      <Section title="After you hire">
        <p>
          The same platform gets new starters ready before their first live call, with{" "}
          <TextLink href="/contact-centre-training">practice calls</TextLink> and{" "}
          <TextLink href="/training-courses">courses built from your own training material</TextLink>.
        </p>
      </Section>
    </ContentPage>
  );
}
