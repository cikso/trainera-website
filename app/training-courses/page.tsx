import { Bullets, ContentPage, Section, TextLink } from "@/components/content-page";
import { pageMetadata } from "@/lib/site";

/**
 * Courses from your documents (trainera.ai/training-courses). Indexable.
 * Written for people searching for ways to turn training material into
 * online courses. Every claim repeats the home page's Train section and
 * features (components/landing/premium-page.tsx); keep the two in step, and
 * ask the owner before adding a new claim.
 */
const TITLE = "Turn your training documents into online courses | Trainera";
const DESCRIPTION =
  "Upload your slides or documents and Trainera builds lessons, quizzes and a presentation narrated by an AI trainer, with certificates, expiry dates and CPD hours tracked.";

export const metadata = pageMetadata("/training-courses", TITLE, DESCRIPTION);

export default function TrainingCoursesPage() {
  return (
    <ContentPage
      label="Courses from your documents"
      title="Turn the training you already have into online courses"
      intro={
        <p>
          Your best training material sits in slide decks, PDFs and your trainers&apos; heads. Upload it once and
          Trainera does the heavy lifting. Your trainers review and publish instead of building from scratch.
        </p>
      }
    >
      <Section title="One upload becomes">
        <Bullets
          items={[
            "Lessons in plain language",
            "Quizzes and knowledge checks",
            "A narrated presentation by an AI trainer",
            "Live questions and answers with the trainer, out loud",
            "A practice call built from the same content",
            "Certificates with expiry dates and CPD hours",
          ]}
        />
      </Section>

      <Section title="Built from your material">
        <p>
          The lessons, AI customers and scorecards are built from your policies, training decks and product
          information, and you can edit any of it. Learners ask the trainer questions out loud and get answers
          from your material.
        </p>
      </Section>

      <Section title="Practise what the course teaches">
        <p>
          Each course can come with a practice call built from the same content, so learners put what they have
          just learned into a realistic conversation and get scored on it.{" "}
          <TextLink href="/contact-centre-training">How practice calls work</TextLink>.
        </p>
      </Section>

      <Section title="Certificates and compliance">
        <p>
          Completions, expiry dates and CPD hours are tracked for compliance, so you can see who is certified and
          whose certificate is due for renewal.
        </p>
      </Section>

      <Section title="Answers from your documents">
        <p>
          With the Knowledge Hub, staff ask your documents a question and get an answer with the page it came
          from.
        </p>
      </Section>
    </ContentPage>
  );
}
