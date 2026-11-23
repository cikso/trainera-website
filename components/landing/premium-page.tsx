import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ClipboardCheck,
  Clock,
  Eye,
  Headphones,
  Heart,
  Lock,
  MessageCircle,
  Plus,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";

// Bricolage with its optical-size axis, for this page only: display sizes get the tighter
// display cut the approved design uses. Same family name as the app-wide wght-only import
// in app/layout.tsx, so the app's own headings are unaffected.
import "@fontsource-variable/bricolage-grotesque/opsz.css";
// Inter's true italics, for this page only: the tagline under the logo is set in bold italic.
import "@fontsource-variable/inter/wght-italic.css";
import "./premium.css";
import { LandingNav, BrandLine } from "./landing-nav";

/* Portrait sprite (public/landing/premium/customer-portraits.webp, 3 x 2). */
const FACES = [
  ["0%", "0%"],
  ["50%", "0%"],
  ["100%", "0%"],
  ["0%", "100%"],
  ["50%", "100%"],
  ["100%", "100%"],
] as const;

function Face({ index, className = "", label }: { index: number; className?: string; label?: string }) {
  const [x, y] = FACES[index];
  return (
    <span
      className={`tp-face ${className}`}
      style={{ "--fx": x, "--fy": y } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

function Eyebrow({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="tp-eyebrow">
      {n ? <span className="tp-eyebrow-n">{n}</span> : null}
      {children}
    </p>
  );
}

function PlusList({ items }: { items: string[] }) {
  return (
    <ul className="tp-plus">
      {items.map((item) => (
        <li key={item}>
          <Plus aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A product picture with numbered pins and a matching legend, so the image explains itself. */
function AnnotatedShot({
  caption,
  note,
  src,
  width,
  height,
  alt,
  pins,
  notes,
  priority = false,
  live = false,
}: {
  caption: string;
  note: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  pins: [string, string][];
  notes: [string, string][];
  priority?: boolean;
  live?: boolean;
}) {
  return (
    <figure className="tp-shot">
      <figcaption className="tp-shot-cap">
        {live ? <span className="tp-live-dot" aria-hidden="true" /> : null}
        {caption} <small>({note})</small>
      </figcaption>
      <div className="tp-shot-frame">
        <Image src={src} width={width} height={height} alt={alt} unoptimized priority={priority} />
        {pins.map(([x, y], i) => (
          <span key={`${x}-${y}`} className="tp-pin" style={{ "--x": x, "--y": y } as CSSProperties} aria-hidden="true">
            {i + 1}
          </span>
        ))}
      </div>
      <ol className="tp-notes">
        {notes.map(([title, body], i) => (
          <li key={title}>
            <span className="tp-num" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* "Trainera helps you:", the partner's six points, verbatim. */
const HELPS = [
  "Accelerate onboarding and time to competency",
  "Build confidence before employees speak to real customers",
  "Identify knowledge and performance gaps",
  "Deliver consistent, personalised coaching",
  "Measure progress over time",
  "Reduce the risk and cost of learning on the job",
];

const FEATURES = [
  ["AI customer calls.", "Practice calls by voice or chat, with customers who react to what your people say."],
  ["Candidate assessments.", "A realistic, scored call before you hire. About 15 minutes on any phone or laptop."],
  ["AI training academy.", "Upload slides or documents and get lessons, quizzes and a narrated presentation."],
  ["Scoring and feedback.", "Every conversation scored against your scorecard, with quotes from the call as evidence."],
  ["Real call reviews.", "Upload recorded calls and score them the same way as practice."],
  ["Team insights.", "Strengths, gaps and readiness across every team."],
  ["Knowledge Hub.", "Staff ask your documents a question and get an answer with the page it came from."],
  ["Certificates.", "Completions, expiry dates and CPD hours tracked for compliance."],
];

const PERSONAS = [
  { face: 0, name: "Sarah Mitchell", meta: "38, Western Sydney", mood: "Frustrated", channel: "Voice", situation: "Her grocery order has gone missing for the third time this month. She wants a refund today and she’s tired of apologies.", tests: "Listening, ownership and clear next steps" },
  { face: 1, name: "Daniel Osei", meta: "52, Dandenong", mood: "Worried", channel: "Voice", situation: "He hurt his back lifting at work. It’s his first claim and he doesn’t know how he’ll pay the mortgage while he’s off.", tests: "Empathy, accurate information and setting expectations" },
  { face: 2, name: "Rebecca Tran", meta: "34, Penrith", mood: "Anxious", channel: "Voice", situation: "Floodwater is through the house. She has two kids and a dog in the car and needs somewhere to stay tonight.", tests: "Staying calm, prioritising and finding options" },
  { face: 3, name: "Graham Walsh", meta: "71, Geelong", mood: "Confused", channel: "Voice", situation: "His bill has doubled and he doesn’t use the app. He wants someone to explain it slowly, without jargon.", tests: "Patience, plain language and care for vulnerable customers" },
  { face: 4, name: "Priya Nair", meta: "45, Blacktown", mood: "Fed up", channel: "Chat", situation: "She was promised a call back twice and nobody rang. Now she wants to speak to a manager.", tests: "Calming things down, ownership and complaint handling" },
  { face: 5, name: "Omar Haddad", meta: "33, Parramatta", mood: "Sceptical", channel: "Voice", situation: "A competitor quoted him $20 a month less. He’s calling to cancel unless someone gives him a reason to stay.", tests: "Asking questions, explaining value and retention" },
];

const SCENARIOS = ["Language barriers", "Confused customers", "Difficult customers", "Emotional callers", "Complaints and escalations", "Sales objections", "Cancellations", "Compliance checks", "Calls under pressure"];

const REASONS = [
  { Icon: Headphones, title: "Conditions that feel real", body: "Natural voices with a range of accents. Customers interrupt, hesitate and change their minds, just like on the phones." },
  { Icon: Clock, title: "Any call, any time", body: "Nobody waits for a trainer or a colleague to play the customer. People can practise at 7 am or 11 pm." },
  { Icon: Target, title: "Your standards", body: "Your scorecards, products, processes and wording. Trainera grades against what good looks like in your business." },
  { Icon: Zap, title: "Quick to set up", body: "Start from a document, a recorded call or one sentence. Trainera drafts the scenario and you approve it." },
  { Icon: Scale, title: "Fair and consistent", body: "Everyone is scored on the same criteria, with evidence from their own words." },
  { Icon: Eye, title: "You choose who sees what", body: "Managers only, the score only, or full feedback. You decide for each training plan." },
];

const FAQ = [
  ["What exactly is Trainera?", "Trainera is an AI training platform for teams that talk to customers. It gives your people realistic practice conversations with AI customers, scores every conversation against your standards, turns your training documents into courses, and shows managers who is ready and who needs help."],
  ["Does it replace our trainers?", "No. It takes the repetitive work off them, like playing the same customer again and again, building scenarios from scratch and marking assessments. Your trainers keep the coaching, the judgement calls and the people side of the job."],
  ["How realistic are the AI customers?", "They speak naturally by voice or chat, with a range of accents including Australian. Each one has a backstory and a mood that changes with how they’re treated. A customer who feels listened to calms down. One who is rushed gets more frustrated."],
  ["Can we use our own content and processes?", "Yes. Start from your policies, training decks, product information or recordings of real calls. The AI customers, lessons and scorecards are built from your material, and you can edit any of it."],
  ["How long does it take to set up?", "A first practice call takes minutes. Describe the call or upload a document, check what Trainera drafts, and publish it to your team."],
  ["Can candidates use it before they work for us?", "Yes. Candidates join an assessment with a code or a link, complete a realistic call on their own phone or laptop, and you see their scored result."],
  ["Can we score our real calls too?", "Yes. Upload recordings and Trainera transcribes them and scores them with the same scorecard you use for practice. Practice and real performance are measured the same way."],
  ["Who sees the scores?", "You decide for each training plan: managers only, the score only, or full feedback for the learner."],
  ["Where is our data kept?", "Your Trainera database and uploaded files are stored in Australia, in Sydney. To run practice calls and score them, conversations are processed by our AI and voice providers. Each organisation’s data is kept separate from every other organisation’s."],
];

/* Illustrative waveform heights for the recorded-call card. */
const WAVE = [30, 62, 44, 90, 55, 74, 38, 82, 60, 95, 48, 70, 34, 58, 86, 42, 66, 28, 52, 76, 40, 62, 30, 48];

/**
 * The public marketing landing page: explanation first. Server-rendered; the mobile menu in
 * <LandingNav> is the only client code.
 * `loginUrl` is the app's full address (app.trainera.ai/login), a different website: keep it a
 * plain <a href>. Keep `id="s-hero"` on the hero: the smooth-scrolling rule in app/globals.css
 * depends on it.
 */
export function PremiumLandingPage({
  loginUrl = "https://app.trainera.ai/login",
  demoUrl = "/book-a-demo",
}: {
  loginUrl?: string;
  demoUrl?: string;
}) {
  return (
    <div className="tp-page">
      <a className="tp-skip" href="#tp-main">
        Skip to content
      </a>
      <LandingNav loginUrl={loginUrl} demoUrl={demoUrl} />

      <main id="tp-main">
        {/* ============ HERO ============
            The partner's wording, verbatim (October 2026): a photo banner with the headline and
            the subheadline, then what Trainera is and how it helps. */}
        <section className="tp-hero" id="s-hero">
          <div className="tp-hero-banner">
            <div className="tp-hero-photo">
              <Image
                src="/landing/premium/hero-agent.webp"
                width={3072}
                height={1728}
                alt="A smiling contact centre agent wearing a headset, on a call at her desk"
                unoptimized
                priority
              />
            </div>
            <div className="tp-wrap tp-hero-banner-inner">
              <div className="tp-hero-banner-copy">
                <h1 className="tp-h1 tp-hero-title">
                  Let your team practise on <span className="tp-hero-accent">AI customers</span> before they talk to
                  yours.
                </h1>
                <p className="tp-hero-sub">
                  <span>Build confidence.</span> <span>Improve performance.</span> <span>Get people ready faster.</span>
                </p>
                <div className="tp-ctas">
                  <a className="tp-btn" href={demoUrl}>
                    Book a demo <ArrowRight aria-hidden="true" />
                  </a>
                  <a className="tp-btn tp-btn-ghost-light" href="#how-it-works">
                    See how it works <ArrowDown aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="tp-wrap tp-intro">
            <div className="tp-intro-grid">
              <div className="tp-copy tp-intro-copy">
                <h2 className="tp-intro-title">
                  Trainera is an AI-powered training platform designed for contact centres and any team that interacts
                  with customers.
                </h2>
                <p>
                  Employees interact with AI customers through realistic voice and chat simulations, handling the types of
                  conversations they’ll encounter every day, from routine enquiries to challenging customer interactions.
                </p>
                <p>
                  Every conversation is assessed against your standards, providing actionable insights into{" "}
                  <strong>readiness, capability and coaching needs</strong>.
                </p>
              </div>
              <aside className="tp-features tp-helps" aria-labelledby="tp-helps-title">
                <h3 className="tp-h3" id="tp-helps-title">
                  Trainera helps you:
                </h3>
                <ul className="tp-checks">
                  {HELPS.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <p className="tp-tagline">
              <span>Practise with AI.</span> <span className="tp-tagline-accent">Perform with confidence.</span>
            </p>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="tp-band tp-band-grey" id="how-it-works">
          <div className="tp-wrap">
            <div className="tp-section-head">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="tp-h2">From one sentence to a scored practice call</h2>
              <p className="tp-lead">
                There are no blank forms to fill in and no scripts to write. Trainera drafts everything, and you check it
                before anyone sees it.
              </p>
            </div>
            <ol className="tp-steps">
              <li className="tp-step">
                <span className="tp-step-n">Step 1</span>
                <h3 className="tp-h3">Tell Trainera about the call</h3>
                <p>
                  Upload a policy, a training deck or a recording of a real call, or describe the situation in a
                  sentence. Trainera writes the AI customer, their backstory, what they know and a scorecard to grade
                  against.
                </p>
                <div className="tp-mini">
                  <span className="tp-mini-label">Describe the call</span>
                  <p className="tp-mini-text">
                    An anxious policyholder whose house has flooded. She has two kids and a dog and needs somewhere to
                    stay tonight.
                    <span className="tp-caret" aria-hidden="true" />
                  </p>
                  <div className="tp-mini-or">
                    <span>Or upload</span>
                    {["PDF", "PowerPoint", "Word", "Call recording"].map((t) => (
                      <span key={t} className="tp-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
              <li className="tp-step">
                <span className="tp-step-n">Step 2</span>
                <h3 className="tp-h3">Your people practise</h3>
                <p>
                  They talk to the AI customer out loud or by chat, as many times as they need. The customer reacts to
                  what they hear. Good listening calms them down, rushing makes them angrier, and some details only come
                  out if your person asks.
                </p>
                <div className="tp-mini">
                  <div className="tp-mini-head">
                    <Face index={2} className="tp-face-sm" label="Rebecca Tran, a fictional AI customer" />
                    <div>
                      <strong>Rebecca Tran</strong>
                      <small>Anxious AI customer</small>
                    </div>
                    <span className="tp-rec">
                      <AudioLines aria-hidden="true" />
                      Voice call, 3:12
                    </span>
                  </div>
                  <p className="tp-bubble tp-bubble-them">
                    <b>Rebecca</b>
                    Does anywhere even take dogs? I can’t leave him behind.
                  </p>
                  <p className="tp-bubble tp-bubble-you">
                    <b>Your agent</b>
                    Yes. Let’s find you somewhere for tonight that takes dogs.
                  </p>
                </div>
              </li>
              <li className="tp-step">
                <span className="tp-step-n">Step 3</span>
                <h3 className="tp-h3">Everyone gets scored and coached</h3>
                <p>
                  Minutes after the call ends, Trainera scores it out of 100 against your criteria. Each score comes with
                  quotes from the call and one clear thing to try next time. Managers see the results for the whole team.
                </p>
                <div className="tp-mini">
                  <div className="tp-score-top">
                    <span className="tp-score">
                      78<small>/100</small>
                    </span>
                    <span className="tp-pill tp-pill-pass">Passed</span>
                  </div>
                  <ul className="tp-bars">
                    {([["Empathy", 88, false], ["Verification", 64, true], ["Next steps", 82, false]] as const).map(([label, value, warn]) => (
                      <li key={label}>
                        <span>{label}</span>
                        <i className={warn ? "tp-bar tp-bar-warn" : "tp-bar"} style={{ "--v": `${value}%` } as CSSProperties} />
                        <b>{value}</b>
                      </li>
                    ))}
                  </ul>
                  <p className="tp-tip">
                    <b>Try next time:</b> confirm her policy number before you offer options.
                  </p>
                </div>
              </li>
            </ol>
            <div className="tp-howto-shot">
              <AnnotatedShot
                live
                caption="A practice call in Trainera"
                note="example"
                src="/landing/premium/simulator-enterprise-light.webp"
                width={1536}
                height={1024}
                alt="A Trainera practice call. On the left, the AI customer Sarah Mitchell, marked as a frustrated shopper with missing items. In the middle, the conversation between Sarah and the agent. On the right, live coaching with an example score of 82 out of 100 and the next best actions."
                pins={[["23%", "17%"], ["43%", "15%"], ["73.6%", "25%"]]}
                notes={[
                  ["The AI customer", "Sarah is frustrated. It’s the third time her order has gone missing."],
                  ["The conversation", "She reacts to what your agent says, out loud or by chat."],
                  ["The score", "82 out of 100 against your scorecard, with what to do better."],
                ]}
              />
            </div>
            <p className="tp-loop" aria-label="Practise, get scored, improve, repeat">
              Practise <ArrowRight aria-hidden="true" /> Get scored <ArrowRight aria-hidden="true" /> Improve{" "}
              <ArrowRight aria-hidden="true" /> Repeat
            </p>
          </div>
        </section>

        {/* ============ WHY: the problem + what's in it ============ */}
        <section className="tp-band" id="why">
          <div className="tp-wrap tp-why-grid">
            <div className="tp-copy">
              <Eyebrow>Why Trainera</Eyebrow>
              <h2 className="tp-h2">Most training stops right before the hard part</h2>
              <p>
                Customer service training is usually slides, a quiz and a few weeks of shadowing. Then new
                starters meet their first angry, confused or upset customer on a live call.
              </p>
              <p>
                Trainers can’t act out every situation with every person. Feedback depends on who happened to hear
                which call, and most calls are never reviewed at all.
              </p>
              <p className="tp-turn">Trainera adds the missing step, which is practice.</p>
              <p>
                People rehearse the conversations they find hard, as often as they need, and get scored the same way
                every time. Confidence gets built before the call that counts.
              </p>
              <p className="tp-list-title">Built for teams in</p>
              <div className="tp-built-for">
                {["Contact centres", "Customer service", "Sales", "Insurance and claims", "Retail", "Recruitment"].map((t) => (
                  <span key={t} className="tp-pill tp-pill-plain">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <aside className="tp-features" aria-labelledby="tp-features-title">
              <h3 className="tp-h3" id="tp-features-title">
                What’s in Trainera
              </h3>
              <ul className="tp-checks">
                {FEATURES.map(([label, body]) => (
                  <li key={label}>
                    <Check aria-hidden="true" />
                    <p>
                      <strong>{label}</strong> {body}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ============ AI CUSTOMERS ============ */}
        <section className="tp-band tp-band-grey" id="customers">
          <div className="tp-wrap">
            <div className="tp-section-head">
              <Eyebrow>The AI customers</Eyebrow>
              <h2 className="tp-h2">Meet some of the customers your team will talk to</h2>
              <p className="tp-lead">
                They aren’t real people, but they behave like them. Each AI customer has a backstory, a mood that changes
                with how they’re treated, and details they only share when someone asks the right question.
              </p>
            </div>
            <ul className="tp-cast">
              {PERSONAS.map((p) => (
                <li key={p.name} className="tp-persona">
                  <div className="tp-persona-head">
                    <Face index={p.face} label={`Portrait of ${p.name}, a fictional AI customer`} />
                    <div>
                      <h3 className="tp-h3">{p.name}</h3>
                      <p className="tp-persona-meta">{p.meta}</p>
                    </div>
                  </div>
                  <div className="tp-chips">
                    <span className="tp-pill tp-pill-mood">{p.mood}</span>
                    <span className="tp-pill tp-pill-plain">{p.channel}</span>
                  </div>
                  <p className="tp-situation">{p.situation}</p>
                  <p className="tp-tests">
                    <span>What it tests</span>
                    {p.tests}
                  </p>
                </li>
              ))}
            </ul>
            <div className="tp-scenarios">
              <div>
                <p className="tp-list-title">Scenarios can include</p>
                <div className="tp-scenario-tags">
                  {SCENARIOS.map((s) => (
                    <span key={s} className="tp-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="tp-build-own">
                <Sparkles size={20} aria-hidden="true" />
                <p>
                  <strong>Build your own in minutes.</strong> Describe a customer in one sentence, or start from a
                  document or a recorded call. You can make them calmer, angrier or harder to please whenever you like.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 01 HIRE ============ */}
        <section className="tp-band" id="hire">
          <div className="tp-wrap tp-stage-grid">
            <div className="tp-stage-media">
              <AnnotatedShot
                caption="A candidate assessment"
                note="example"
                src="/landing/premium/hire-enterprise-light.webp"
                width={1536}
                height={1024}
                alt="A Trainera candidate assessment. The AI customer Sarah Mitchell, 38, from Western Sydney, marked frustrated and short on time, with a Start call button. Three call objectives on the right, and an example result for the candidate J. Okafor of 74 out of 100: strong empathy, missed verification."
                pins={[["40%", "19%"], ["71%", "12%"], ["72%", "66%"]]}
                notes={[
                  ["The customer", "Every candidate speaks to the same AI customer."],
                  ["The task", "Clear objectives for the call, set by you."],
                  ["The result", "A score out of 100, with strengths and gaps."],
                ]}
              />
            </div>
            <div className="tp-copy">
              <Eyebrow n="01">Hire</Eyebrow>
              <h2 className="tp-h2">Know they can do the job before you hire them</h2>
              <p>
                An interview tells you how someone talks about customer service. It doesn’t show you how they handle an
                upset customer.
              </p>
              <p className="tp-turn">Trainera shows you.</p>
              <p>
                Candidates take a realistic customer call, the kind they would handle in their first week, from their
                own phone or laptop. They scan a code or open a link and start talking. Everyone gets the same customer,
                the same situation and the same scorecard, so you compare candidates fairly.
              </p>
              <p className="tp-list-title">For every candidate, you see</p>
              <PlusList items={["Communication", "Listening", "Empathy", "Problem solving", "Accuracy", "Staying calm under pressure"]} />
              <p>
                You shortlist on evidence instead of gut feel. Candidates also get a realistic preview of the job, so the
                people who accept know what the work involves.
              </p>
              <p className="tp-mantra">
                <strong>Scan. Talk. Get scored.</strong>
                <span>About 15 minutes, anywhere, any time.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 ONBOARD ============ */}
        <section className="tp-band tp-band-grey" id="onboard">
          <div className="tp-wrap tp-stage-grid tp-flip">
            <div className="tp-stage-media">
              <div
                className="tp-plan"
                role="img"
                aria-label="Example practice plan for a new starter called Jess: two practice calls passed with 84 and 78 out of 100, one in progress and one locked until the previous call is done."
              >
                <div className="tp-plan-head">
                  <div>
                    <small>New starter, week 1</small>
                    <strong>Jess’s practice plan</strong>
                  </div>
                  <span className="tp-pill tp-pill-warn">2 of 4 passed</span>
                </div>
                <ol className="tp-plan-list">
                  <li>
                    <span className="tp-st tp-st-done">
                      <Check aria-hidden="true" />
                    </span>
                    <Face index={0} className="tp-face-xs" />
                    <div>
                      <strong>Missing order refund</strong>
                      <small>Sarah, voice call</small>
                    </div>
                    <span className="tp-res">
                      84<small>/100</small>
                    </span>
                  </li>
                  <li>
                    <span className="tp-st tp-st-done">
                      <Check aria-hidden="true" />
                    </span>
                    <Face index={2} className="tp-face-xs" />
                    <div>
                      <strong>Flood claim, needs a place to stay</strong>
                      <small>Rebecca, voice call</small>
                    </div>
                    <span className="tp-res">
                      78<small>/100</small>
                    </span>
                  </li>
                  <li>
                    <span className="tp-st tp-st-now">3</span>
                    <Face index={4} className="tp-face-xs" />
                    <div>
                      <strong>Missed callback complaint</strong>
                      <small>Priya, chat</small>
                    </div>
                    <span className="tp-pill tp-pill-mood">In progress</span>
                  </li>
                  <li>
                    <span className="tp-st tp-st-lock">
                      <Lock aria-hidden="true" />
                    </span>
                    <Face index={5} className="tp-face-xs" />
                    <div>
                      <strong>Cancellation save</strong>
                      <small>Omar, voice call. Unlocks after step 3</small>
                    </div>
                    <span className="tp-pill tp-pill-plain">Locked</span>
                  </li>
                </ol>
                <div className="tp-plan-foot">
                  <strong>Ready for live calls when all four pass</strong>
                  <span>Pass mark 75</span>
                </div>
              </div>
            </div>
            <div className="tp-copy">
              <Eyebrow n="02">Onboard</Eyebrow>
              <h2 className="tp-h2">Get new starters confident before their first live call</h2>
              <p>
                Onboarding usually means weeks of classroom time, shadowing and supervised calls. Even then, new
                starters meet their hardest calls for the first time with a real customer on the line.
              </p>
              <p className="tp-turn">Trainera changes the order.</p>
              <p>
                New starters practise the calls they will actually take, with AI customers who behave like real ones, as
                many times as they need. Their mistakes happen in practice, where they cost nothing.
              </p>
              <p className="tp-list-title">Before going live, they can practise</p>
              <PlusList
                items={[
                  "Your most common call types",
                  "Difficult and emotional customers",
                  "Complaints and objections",
                  "Your products, processes and policies",
                  "Compliance steps and disclosures",
                  "Several chats and calls at once",
                ]}
              />
              <p className="tp-inset">
                <strong>Practise instead of shadowing</strong>
                Shadowing shows people what good looks like. Practice lets them do it themselves and hear how they went.
              </p>
              <p>The result is less time shadowing, calmer first weeks and a clear view of who is ready to go live.</p>
              <p className="tp-mantra">
                <strong>Practise. Perform. Get scored. Improve.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ============ 03 TRAIN ============ */}
        <section className="tp-band" id="train">
          <div className="tp-wrap tp-stage-grid">
            <div className="tp-stage-media">
              <AnnotatedShot
                caption="A course built from one upload"
                note="example"
                src="/landing/premium/classroom-enterprise-light.webp"
                width={1625}
                height={968}
                alt="A Trainera course called Customer Care Essentials. The lesson Our Service Principles and Tone of Voice shows five principle cards, a narration player, and an Ask Jenny panel where the learner can ask the AI trainer a question by voice."
                pins={[["66.5%", "14.5%"], ["38%", "80.5%"], ["74%", "33%"]]}
                notes={[
                  ["Lessons from your document", "Your content, rewritten as short lessons."],
                  ["A narrated presentation", "An AI trainer talks learners through each part."],
                  ["Ask the trainer", "Learners ask questions out loud and get answers from your material."],
                ]}
              />
            </div>
            <div className="tp-copy">
              <Eyebrow n="03">Train</Eyebrow>
              <h2 className="tp-h2">Turn the training you already have into an AI training academy</h2>
              <p>
                Your best training material sits in slide decks, PDFs and your trainers’ heads. Turning it into
                online courses takes weeks, and it is often out of date by the time it’s finished.
              </p>
              <p className="tp-turn">Upload it once and Trainera does the heavy lifting.</p>
              <p className="tp-list-title">One upload becomes</p>
              <PlusList
                items={[
                  "Lessons in plain language",
                  "Quizzes and knowledge checks",
                  "A narrated presentation by an AI trainer",
                  "Live Q&A with the trainer, out loud",
                  "A practice call built from the same content",
                  "Certificates with expiry dates and CPD hours",
                ]}
              />
              <p>Your trainers review and publish instead of building from scratch.</p>
              <p className="tp-inset">
                <strong>Daily Boost keeps it fresh</strong>
                After a course, learners answer three quick questions on a spaced schedule: the next day, then after
                three days, a week, two weeks and a month. What they learned in week one is still there months later.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 04 COACH ============ */}
        <section className="tp-band tp-band-grey" id="coach">
          <div className="tp-wrap tp-stage-grid tp-flip">
            <div className="tp-stage-media">
              <AnnotatedShot
                caption="The manager’s view of a team"
                note="example data"
                src="/landing/premium/dashboard-enterprise-pass.webp"
                width={1626}
                height={967}
                alt="A Trainera team dashboard with example data: active users, pass rate, completion and runs this week; an average overall score of 85 out of 100; team readiness for each person; a skill heat map; and a list of actions for the manager."
                pins={[["63.5%", "35.5%"], ["19.5%", "68.5%"], ["66%", "67.5%"]]}
                notes={[
                  ["Team readiness", "Who is ready and who needs help."],
                  ["Skills at a glance", "Average scores for each skill on your scorecard."],
                  ["What to do next", "Results to review and people to follow up."],
                ]}
              />
            </div>
            <div className="tp-copy">
              <Eyebrow n="04">Coach and improve</Eyebrow>
              <h2 className="tp-h2">The same standard for every person, on every shift</h2>
              <p>
                Feedback today depends on who listened to which call. Two supervisors can score the same call
                differently, and most calls are never reviewed at all.
              </p>
              <p className="tp-turn">Trainera applies your standard to every conversation.</p>
              <p>
                Practice calls and recorded real calls are scored against the same scorecard. Every score comes with
                quotes from the call that show why. Managers see strengths and gaps across the whole team, and who needs
                support first.
              </p>
              <p className="tp-list-title">Trainera picks up</p>
              <PlusList
                items={[
                  "Communication",
                  "Tone and empathy",
                  "Compliance and disclosures",
                  "Accuracy of information",
                  "Asking the right questions",
                  "Following process",
                  "Problem solving",
                  "Missed critical steps",
                ]}
              />
              <p>Supervisors spend their time coaching instead of searching for what to coach.</p>
            </div>
          </div>
        </section>

        {/* ============ 05 REAL CALLS ============ */}
        <section className="tp-band" id="real-calls">
          <div className="tp-wrap tp-stage-grid">
            <div className="tp-stage-media">
              <ol className="tp-flow" aria-label="Example: a recorded call becomes a practice scenario">
                <li>
                  <span className="tp-fic">
                    <Upload size={20} aria-hidden="true" />
                  </span>
                  <div className="tp-flow-body">
                    <small>1. Upload a recording</small>
                    <strong>Billing dispute, 12 September</strong>
                    <p>A real call handled by one of your top agents (6:42)</p>
                    <div className="tp-wave" aria-hidden="true">
                      {WAVE.map((h, i) => (
                        <i key={i} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <span className="tp-fic">
                    <ClipboardCheck size={20} aria-hidden="true" />
                  </span>
                  <div className="tp-flow-body">
                    <small>2. Transcribed and scored</small>
                    <strong>91/100 on your scorecard</strong>
                    <div className="tp-flow-row">
                      <span className="tp-pill tp-pill-pass">Empathy 94</span>
                      <span className="tp-pill tp-pill-pass">Resolution 90</span>
                      <span className="tp-pill tp-pill-pass">Verification 88</span>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="tp-fic">
                    <Sparkles size={20} aria-hidden="true" />
                  </span>
                  <div className="tp-flow-body">
                    <small>3. Turned into practice</small>
                    <strong>New practice call: billing dispute, calm resolution</strong>
                    <p>Draft built from this call, graded with the same scorecard. Review it, then assign it.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="tp-copy">
              <Eyebrow n="05">Learn from real calls</Eyebrow>
              <h2 className="tp-h2">Turn your best real calls into everyone’s training</h2>
              <p>
                Upload recordings of real customer calls. Trainera transcribes them and scores them against your
                scorecard, so real performance is measured the same way as practice.
              </p>
              <p className="tp-turn">Then your best calls become practice scenarios.</p>
              <p>
                Pick the calls that show how it should be done and Trainera builds a practice call from them. New
                starters learn from how your top people actually handle customers, instead of a generic script.
              </p>
              <p className="tp-mantra">
                <strong>Upload. Score. Practise.</strong>
                <span>Your people, your standards.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============ WHY TEAMS CHOOSE TRAINERA ============ */}
        <section className="tp-band tp-band-grey" id="reasons">
          <div className="tp-wrap">
            <div className="tp-section-head">
              <Eyebrow>Why teams choose Trainera</Eyebrow>
              <h2 className="tp-h2">Practice that feels like the real job</h2>
            </div>
            <ul className="tp-reasons">
              {REASONS.map(({ Icon, title, body }) => (
                <li key={title} className="tp-reason">
                  <span className="tp-use-ic">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="tp-h3">{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
            <div className="tp-trainers">
              <p className="tp-h2">Trainera doesn’t replace your trainers. It gives them their time back.</p>
              <div>
                <p>
                  Your trainers shouldn’t have to play the same customer for the hundredth time, build every scenario
                  from scratch or mark assessments by hand. Trainera takes on the repetitive work so they can focus on the parts
                  only people can do.
                </p>
                <div className="tp-values">
                  {([[Target, "Judgement"], [MessageCircle, "Coaching"], [TrendingUp, "Development"], [Heart, "Human connection"]] as const).map(([Icon, label]) => (
                    <span key={label} className="tp-tag">
                      <Icon aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="tp-band" id="faq">
          <div className="tp-wrap tp-faq-grid">
            <div className="tp-copy">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="tp-h2">What people ask us</h2>
              <p>
                If your question isn’t here, book a demo and ask us directly. We’ll show you Trainera working on a
                situation from your own team.
              </p>
              <div className="tp-ctas">
                <a className="tp-btn tp-btn-ghost" href={demoUrl}>
                  Book a demo <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="tp-faq-list">
              {FAQ.map(([question, answer], i) => (
                <details key={question} className="tp-qa" open={i === 0}>
                  <summary>
                    {question}
                    <Plus aria-hidden="true" />
                  </summary>
                  <div className="tp-qa-body">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CLOSING CTA ============ */}
        <section className="tp-cta" id="book">
          <div className="tp-wrap tp-cta-grid">
            <div>
              <h2 className="tp-h2">See Trainera with one of your own calls</h2>
              <p>
                Book a demo and bring a situation your team finds hard. We’ll turn it into a practice call so you can
                hear how it works.
              </p>
              <div className="tp-cta-faces" aria-hidden="true">
                {FACES.map((_, i) => (
                  <Face key={i} index={i} />
                ))}
              </div>
            </div>
            <div className="tp-ctas">
              <a className="tp-btn tp-btn-light" href={demoUrl}>
                Book a demo <ArrowRight aria-hidden="true" />
              </a>
              <a className="tp-btn tp-btn-ghost" href={loginUrl}>
                Log in <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="tp-foot">
        <div className="tp-wrap">
          <div className="tp-foot-grid">
            <div className="tp-foot-brand">
              <a className="tp-logo" href="#s-hero" aria-label="Trainera home">
                <Image src="/brand/trainera-logo.png" width={1147} height={320} alt="Trainera" />
                <BrandLine />
              </a>
              <p>
                The AI training platform for teams that talk to customers. Practise real conversations, get scored
                against your standards and get ready faster.
              </p>
            </div>
            <div>
              <h4>Platform</h4>
              <ul>
                {([["How it works", "#how-it-works"], ["AI customers", "#customers"], ["Hire", "#hire"], ["Onboard", "#onboard"], ["Train", "#train"], ["Coach", "#coach"], ["Real calls", "#real-calls"]] as const).map(([label, href]) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#why">Why Trainera</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href={demoUrl}>Book a demo</a>
                </li>
                <li>
                  <a href={loginUrl}>Log in</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tp-foot-bottom">
            <span>© 2026 Trainera</span>
            <span>AI training for teams that talk to customers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
