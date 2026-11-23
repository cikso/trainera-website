import { Bullets, ContentPage, Section, TextLink } from "@/components/content-page";
import { pageMetadata } from "@/lib/site";

/**
 * Contact centre training (trainera.ai/contact-centre-training). Indexable.
 * Written for people searching for call centre or contact centre training.
 * Every claim repeats the home page (components/landing/premium-page.tsx);
 * keep the two in step, and ask the owner before adding a new claim.
 */
const TITLE = "AI call training for contact centres | Trainera";
const DESCRIPTION =
  "Let your contact centre team practise real customer calls with AI customers, by voice or chat. Every call is scored against your own scorecard, with quotes from the call as evidence.";

export const metadata = pageMetadata("/contact-centre-training", TITLE, DESCRIPTION);

export default function ContactCentreTrainingPage() {
  return (
    <ContentPage
      label="Contact centre training"
      title="Practise customer calls before they reach a real customer"
      intro={
        <p>
          Trainera gives your agents realistic practice calls with AI customers. Every call is scored against
          your standards, with quotes from the call as evidence, so new starters get confident faster and
          experienced agents keep improving.
        </p>
      }
    >
      <Section title="Customers who react like real ones">
        <p>
          Your agents talk to AI customers by voice or chat, with natural voices and a range of accents
          including Australian. Each customer has a backstory and a mood that changes with how they&apos;re
          treated. A customer who feels listened to calms down. One who is rushed gets more frustrated.
        </p>
        <p>Practice calls can include:</p>
        <Bullets
          items={[
            "Language barriers",
            "Confused customers",
            "Difficult and emotional customers",
            "Complaints and escalations",
            "Sales objections and cancellations",
            "Compliance checks and disclosures",
            "Calls under pressure, and several chats and calls at once",
          ]}
        />
      </Section>

      <Section title="Scored against your standards">
        <p>
          Every conversation is scored against your scorecard. Every score comes with quotes from the call that
          show why, and everyone is scored on the same criteria, so results are fair and consistent.
        </p>
        <p>Trainera picks up:</p>
        <Bullets
          items={[
            "Communication, tone and empathy",
            "Compliance and disclosures",
            "Accuracy of information",
            "Asking the right questions and following process",
            "Problem solving",
            "Missed critical steps",
          ]}
        />
        <p>
          You decide who sees the results for each training plan: managers only, the score only, or full
          feedback for the learner.
        </p>
      </Section>

      <Section title="Real calls, measured the same way">
        <p>
          Upload recordings of real calls and Trainera transcribes them and scores them with the same scorecard
          you use for practice. Practice and real performance are measured the same way.
        </p>
      </Section>

      <Section title="Quick to set up">
        <p>
          Start from your policies, training decks, product information, a recording of a real call or one
          sentence. Trainera drafts the scenario and you approve it. A first practice call takes minutes.
        </p>
      </Section>

      <Section title="Practice any time, without tying up your trainers">
        <p>
          Nobody waits for a trainer or a colleague to play the customer. People can practise at 7 am or 11 pm.
          Your trainers keep the coaching, the judgement calls and the people side of the job, and supervisors
          spend their time coaching instead of searching for what to coach.
        </p>
        <p>
          Managers see strengths, gaps and readiness across every team, and who needs support first.
        </p>
      </Section>

      <Section title="Also part of Trainera">
        <Bullets
          items={[
            <>
              <TextLink href="/candidate-assessment">Candidate assessments</TextLink>: a realistic, scored call
              before you hire.
            </>,
            <>
              <TextLink href="/training-courses">Courses from your documents</TextLink>: lessons, quizzes and a
              narrated presentation from the training you already have.
            </>,
          ]}
        />
      </Section>
    </ContentPage>
  );
}
