"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { MathSnippet } from "@/components/MathSnippet";

const ConceptFlow = dynamic(() => import("@/components/ConceptFlow"), { ssr: false });

export default function HomePage() {
  const [toastMessage, setToastMessage] = useState("Shortcuts ready: N new · H history · S study path · ? help");
  const [toastActive, setToastActive] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<"synced" | "syncing">("synced");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Floating CTA visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("product");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowFloatingCTA(heroBottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".scroll-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (["N", "H", "S", "?"].includes(event.key.toUpperCase())) {
        const map: Record<string, string> = {
          N: "New problem started",
          H: "History opened",
          S: "Study path opened",
          "?": "Help overlay opened"
        };
        setToastMessage(map[event.key.toUpperCase()]);
        setToastActive(true);
        setTimeout(() => setToastActive(false), 2200);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const revealWhatsApp = (event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event?.preventDefault();
    setShowWhatsApp(true);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAutosaveStatus("syncing");
      setTimeout(() => setAutosaveStatus("synced"), 900);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const quotas = [
    { label: "Problems", value: "5 / day" },
    { label: "Hint unlocks", value: "10 / day" },
    { label: "Prerequisite checks", value: "2 / day" },
    { label: "Reflections", value: "2 / day" },
    { label: "Problem variations", value: "2 / day" }
  ];

  const mathSnippet =
    "\\vec{F} = m\\vec{a} \\quad \\Rightarrow \\quad \\omega = \\sqrt{\\frac{k}{mr_0^3}}";

  return (
    <div>
      <div className="bg-ornament" aria-hidden />
      <header className="nav">
        <div className="brand">
          <div className="logo-mark">Φ</div>
          <div>
            <div className="brand-title">PhysiScaffold</div>
            <div className="brand-subtitle">Socratic Physics Engine</div>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <button className="btn" type="button" onClick={revealWhatsApp}>
            Request access
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero theme-core" id="product">
          <div className="hero-copy glass">
            <div className="eyebrow">Your Personal Physics Mentor</div>
            <h1>
              What if you never felt
              <br />
              stuck in physics again?
            </h1>
            <p className="lede">
              Every JEE topper has one thing in common: they learned to think through problems,
              not memorize solutions. PhysiScaffold is like having a brilliant senior who never
              gives you the answer—but makes sure you find it yourself, every single time.
            </p>
            <div className="value-props">
              <div className="value-prop">
                <div className="value-icon">1</div>
                <div>
                  <strong>Paste any problem</strong>
                  <span>We break it into clear steps</span>
                </div>
              </div>
              <div className="value-prop">
                <div className="value-icon">2</div>
                <div>
                  <strong>Get guided, not told</strong>
                  <span>Hints that make you think</span>
                </div>
              </div>
              <div className="value-prop">
                <div className="value-icon">3</div>
                <div>
                  <strong>Build real confidence</strong>
                  <span>Solve it yourself, for real</span>
                </div>
              </div>
            </div>
            <div className="cta-row">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Start learning the right way
              </button>
              <a className="btn btn-ghost" href="#how-it-works">
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-panel glass" id="demo">
            <div className="panel-head">
              <div>
                <div className="label">Live Demo</div>
                <div className="muted">See how PhysiScaffold guides you</div>
              </div>
              <div className="badge flash">Interactive</div>
            </div>
            <div className="problem-card">
              <div className="label">Your Problem</div>
              <div className="prompt">
                A particle moves in a circular path under force F = k/r².
                Find its angular velocity when released from rest at r₀.
              </div>
            </div>
            <div className="scaffold-preview">
              <div className="scaffold-step">
                <div className="step-header">
                  <span className="step-number">Step 1</span>
                  <span className="step-title">Identify the Physics</span>
                  <span className="step-badge">Concept</span>
                </div>
                <div className="step-question">What type of motion is this? What quantities are conserved?</div>
                <div className="hint-levels">
                  <span className="hint-dot unlocked" title="Conceptual hint"></span>
                  <span className="hint-dot unlocked" title="Visualization hint"></span>
                  <span className="hint-dot" title="Strategy hint"></span>
                  <span className="hint-dot" title="Equation hint"></span>
                  <span className="hint-dot" title="Full solution"></span>
                </div>
              </div>
              <div className="scaffold-step">
                <div className="step-header">
                  <span className="step-number">Step 2</span>
                  <span className="step-title">Set Up Energy Balance</span>
                  <span className="step-badge">Math</span>
                </div>
                <div className="step-question">How would you write the total energy of this system?</div>
                <div className="hint-levels">
                  <span className="hint-dot" title="Conceptual hint"></span>
                  <span className="hint-dot" title="Visualization hint"></span>
                  <span className="hint-dot" title="Strategy hint"></span>
                  <span className="hint-dot" title="Equation hint"></span>
                  <span className="hint-dot" title="Full solution"></span>
                </div>
              </div>
              <div className="scaffold-step locked">
                <div className="step-header">
                  <span className="step-number">Step 3</span>
                  <span className="step-title">Solve for Angular Velocity</span>
                  <span className="step-badge">Math</span>
                </div>
                <div className="step-locked-msg">Complete previous steps to unlock</div>
              </div>
              <div className="scaffold-step locked">
                <div className="step-header">
                  <span className="step-number">Step 4</span>
                  <span className="step-title">Sanity Check</span>
                  <span className="step-badge">Check</span>
                </div>
                <div className="step-locked-msg">Verify your answer makes physical sense</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - The Complete Flow */}
        <section className="section theme-learn scroll-reveal" id="how-it-works">
          <div className="section-head">
            <div>
              <p className="eyebrow">Your Journey to Mastery</p>
              <h2>From confused to confident in one problem</h2>
            </div>
          </div>

          <div className="flow-container">
            <div className="flow-step">
              <div className="flow-number">1</div>
              <div className="flow-content">
                <h3>Bring Any Problem</h3>
                <p>That Irodov problem haunting you? The HC Verma question you've been avoiding?
                   Paste it, photograph it, or pick from our library. No problem is too hard—we'll
                   help you crack it.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Text or image</span>
                  <span className="pill pill-ghost">Handwritten solutions</span>
                  <span className="pill pill-ghost">Problem library</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">2</div>
              <div className="flow-content">
                <h3>Know Where You Stand</h3>
                <p>Before diving in, a quick check ensures you have the foundation. No more
                   wasting 30 minutes only to realize you forgot a key concept. We catch gaps
                   before they cost you time.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Foundation check</span>
                  <span className="pill pill-ghost">Gap detection</span>
                  <span className="pill pill-ghost">Targeted review</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step highlight">
              <div className="flow-number">3</div>
              <div className="flow-content">
                <h3>See the Path Forward</h3>
                <p>Complex problems suddenly feel manageable. We break them into clear milestones,
                   each with a guiding question. You always know your next step—no more staring
                   at a blank page wondering where to start.</p>
                <div className="flow-detail">
                  <span className="pill">Clear milestones</span>
                  <span className="pill">Guiding questions</span>
                  <span className="pill">Always know what's next</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step highlight">
              <div className="flow-number">4</div>
              <div className="flow-content">
                <h3>Get Help Without Giving Up</h3>
                <p>Stuck? Don't jump to the solution. Our 5-level hint system gives you just enough
                   to keep going. Most students solve it by Level 2. The satisfaction of figuring it
                   out yourself? That's what builds real confidence.</p>
                <div className="hint-ladder">
                  <div className="hint-level">
                    <span className="hint-label">Level 1</span>
                    <span className="hint-desc">"What physics principle governs this?"</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 2</span>
                    <span className="hint-desc">"Try visualizing it this way..."</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 3</span>
                    <span className="hint-desc">"Here's the strategy that works..."</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 4</span>
                    <span className="hint-desc">"These are the equations you need..."</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 5</span>
                    <span className="hint-desc">"Complete worked solution (last resort)"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">5</div>
              <div className="flow-content">
                <h3>Never Submit Wrong Again</h3>
                <p>Before you finalize, our triple-check system catches errors that lose marks.
                   Test extreme cases, verify dimensions, check symmetry. Walk into exams knowing
                   you've built the habit of verification.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Limit checks</span>
                  <span className="pill pill-ghost">Dimension analysis</span>
                  <span className="pill pill-ghost">Symmetry validation</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">6</div>
              <div className="flow-content">
                <h3>Lock It In Forever</h3>
                <p>The difference between "I solved it once" and "I'll never forget this"?
                   Teaching it. Explain your solution like you're helping a friend. This is how
                   concepts move from short-term memory to permanent understanding.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Teach to learn</span>
                  <span className="pill pill-ghost">Feynman technique</span>
                  <span className="pill pill-ghost">Permanent retention</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes It Different */}
        <section className="section theme-core scroll-reveal" id="difference">
          <div className="section-head">
            <div>
              <p className="eyebrow">The Honest Truth</p>
              <h2>Why most "help" actually hurts your learning</h2>
            </div>
          </div>

          <div className="comparison-grid">
            <div className="comparison-card bad">
              <div className="comparison-header">
                <span className="comparison-icon">✕</span>
                <h4>What You're Doing Now</h4>
              </div>
              <ul>
                <li>Looking up solutions when stuck</li>
                <li>"Understanding" while reading, forgetting by exam</li>
                <li>Feeling like you're learning, but scores don't improve</li>
                <li>Same mistakes, different problems</li>
                <li>Dependent on solution manuals forever</li>
              </ul>
            </div>
            <div className="comparison-card good">
              <div className="comparison-header">
                <span className="comparison-icon">✓</span>
                <h4>What Toppers Do</h4>
              </div>
              <ul>
                <li>Struggle productively with guidance</li>
                <li>Solve it themselves, even if slowly</li>
                <li>Build permanent problem-solving circuits</li>
                <li>Learn from mistakes systematically</li>
                <li>Become independent thinkers</li>
              </ul>
            </div>
          </div>

          <div className="key-insight glass">
            <div className="insight-icon">💡</div>
            <div>
              <strong>The uncomfortable truth:</strong> Reading solutions feels productive but builds nothing.
              The brain only learns when it struggles. PhysiScaffold gives you just enough help to keep
              struggling productively—never so much that you stop thinking. That's why it works.
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section theme-analytics scroll-reveal" id="features">
          <div className="section-head">
            <div>
              <p className="eyebrow">20+ Intelligent Features</p>
              <h2>Built for how your brain actually learns</h2>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Never Get Stuck Again</div>
            <p className="feature-subtitle">That helpless feeling when you stare at a problem for an hour? Gone.</p>
            <div className="grid cards">
              <FeatureCard title="5-Level Scaffolding" tag="Core">
                Every problem breaks into clear steps with 5 levels of guidance—from gentle nudges
                to full solutions. You choose how much help you need. Most solve it by Level 2.
              </FeatureCard>
              <FeatureCard title="Socratic Rewind" tag="Recovery">
                Made a wrong turn? Instead of starting over, we guide you back to where things
                went right. Like having a mentor who says "Let's look at this together."
              </FeatureCard>
              <FeatureCard title="Pre-Flight Checks" tag="Prevention">
                Before you apply a formula, quick checks ensure you're using it correctly.
                "Is acceleration constant?" catches mistakes before they waste your time.
              </FeatureCard>
              <FeatureCard title="Interactive Simulations" tag="Visualization">
                Sometimes you need to see it. Adjust angles, masses, and velocities in real-time.
                Watch physics happen before your eyes. Understanding clicks instantly.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Stop Repeating the Same Mistakes</div>
            <p className="feature-subtitle">That sign error you keep making? The force you always forget? We track them so you can finally fix them.</p>
            <div className="grid cards">
              <FeatureCard title="Circuit Breaker" tag="Intervention">
                Making the same error repeatedly? The system pauses and gives you a targeted
                10-second drill. Fix the root cause, not just the symptom. Then continue.
              </FeatureCard>
              <FeatureCard title="Mistake Notebook" tag="Memory">
                Every error becomes a flashcard. Spaced repetition ensures you see it again
                right before you'd forget. Your weaknesses become strengths over time.
              </FeatureCard>
              <FeatureCard title="Misconception Detection" tag="Clarity">
                "Centripetal force is a separate force"—we catch 12 major physics misconceptions
                the moment they appear. Gentle correction before bad habits form.
              </FeatureCard>
              <FeatureCard title="Constraint Collision" tag="Awareness">
                Forgot a constraint? Added one that doesn't exist? We highlight exactly where
                your work contradicts the problem—no more losing marks to careless reading.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Think Like a Physicist</div>
            <p className="feature-subtitle">The difference between solving problems and truly understanding physics.</p>
            <div className="grid cards">
              <FeatureCard title="Feynman Technique" tag="Deep Learning">
                After solving, explain it in simple words. If you can't teach it, you don't
                understand it. This is how IIT toppers study—and now you can too.
              </FeatureCard>
              <FeatureCard title="Equationless Planning" tag="Strategy">
                Before writing any math, describe your approach in words. Forces you to think
                about physics, not just plug numbers. This habit separates top rankers.
              </FeatureCard>
              <FeatureCard title="Concept Contrast" tag="Precision">
                "Why doesn't energy conservation apply here?" Explaining what doesn't work
                deepens understanding of what does. Master the boundaries, master the concept.
              </FeatureCard>
              <FeatureCard title="Boundary Case Builder" tag="Intuition">
                What happens when the angle goes to zero? When mass becomes infinite? Testing
                limits builds the physical intuition that makes hard problems feel obvious.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Build Unshakeable Confidence</div>
            <p className="feature-subtitle">Know that you know—not just hope you remember.</p>
            <div className="grid cards">
              <FeatureCard title="Confidence Tracking" tag="Self-Awareness">
                Rate your confidence before checking answers. Confident but wrong? That's a
                dangerous gap we'll prioritize. Lucky guess? We'll test you again soon.
              </FeatureCard>
              <FeatureCard title="Sanity Check Matrix" tag="Verification">
                Three checks before you're done: limits, symmetry, dimensions. Build the habit
                of verification. Walk into exams knowing you catch your own errors.
              </FeatureCard>
              <FeatureCard title="Spot the Mistake" tag="Pattern Recognition">
                Practice finding errors in flawed solutions. Train your eye to catch the subtle
                sign flips and wrong assumptions that cost marks.
              </FeatureCard>
              <FeatureCard title="Reveal-Reconstruct-Validate" tag="Comprehension">
                When you do read a solution, we ensure you actually understood it. No more
                "I followed along but can't reproduce it." Prove comprehension before moving on.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Learn by Doing</div>
            <p className="feature-subtitle">Passive reading is the illusion of learning. Active problem-solving is the reality.</p>
            <div className="grid cards">
              <FeatureCard title="Micro-Tasks" tag="Active Learning">
                Every hint requires you to earn it. Answer a quick question, fill a blank,
                explain your thinking. Your brain stays engaged, not passive.
              </FeatureCard>
              <FeatureCard title="FBD Canvas" tag="Visualization">
                Draw force diagrams interactively. Place vectors, check directions, get
                instant feedback. Like having a teacher look over your shoulder.
              </FeatureCard>
              <FeatureCard title="Paper Solution Upload" tag="Your Work">
                Photograph your handwritten work. Our AI reads it, identifies the first
                issue, and guides you forward. Your notebook, our guidance.
              </FeatureCard>
              <FeatureCard title="Explain to Friend" tag="Retention">
                Summarize your solution in exactly 3 lines. This compression forces deep
                understanding. If you can say it simply, you truly get it.
              </FeatureCard>
            </div>
          </div>

          <ConceptFlow />
        </section>

        {/* Quotas Section */}
        <section className="section theme-access scroll-reveal" id="quotas">
          <div className="section-head">
            <div>
              <p className="eyebrow">Intentional Limits</p>
              <h2>Quality over quantity—like real learning</h2>
            </div>
            <div className="badge">Resets daily</div>
          </div>
          <p className="quota-explanation">
            More problems don't mean more learning. Deep engagement with fewer problems
            builds stronger understanding than rushing through dozens. These limits ensure
            you actually think—not just click through.
          </p>
          <div className="quota-grid glass">
            {quotas.map((q) => (
              <Quota key={q.label} label={q.label} value={q.value} />
            ))}
          </div>
        </section>

        {/* Target Audience */}
        <section className="section theme-pages scroll-reveal" id="audience">
          <div className="section-head">
            <div>
              <p className="eyebrow">Is This For You?</p>
              <h2>Built for students who refuse to settle</h2>
            </div>
          </div>
          <div className="grid cards">
            <Card title="The JEE/NEET Dreamer">
              You know the stakes. One exam. One shot. You've seen classmates who "got it"
              while you struggled with the same concepts. This is how you close that gap—for real.
            </Card>
            <Card title="The Self-Learner">
              No coaching? No problem. PhysiScaffold is like having a brilliant IITian friend
              available 24/7—one who never just gives you the answer, but makes sure you get it.
            </Card>
            <Card title="The Frustrated Student">
              Tired of "understanding" solutions but blanking in exams? That gap between
              reading and doing is exactly what we fix. Finally, learning that sticks.
            </Card>
            <Card title="The Concerned Parent">
              Your child spends hours but scores don't improve? Most "help" creates dependency.
              PhysiScaffold builds independence. Watch them become the student who helps others.
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section theme-learn scroll-reveal" id="testimonials">
          <div className="section-head">
            <div>
              <p className="eyebrow">From Beta Users</p>
              <h2>What early users are saying</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card glass">
              <div className="testimonial-content">
                "I used to look at Irodov solutions and think 'yeah, that makes sense.' But in exams,
                I'd blank. PhysiScaffold forced me to actually derive things myself. Painful at first,
                but now I can solve problems I've never seen before. That's the difference."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <div className="testimonial-name">Arjun K.</div>
                  <div className="testimonial-detail">JEE Advanced 2024 · Jumped from 68 to 89 percentile in Physics</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass">
              <div className="testimonial-content">
                "The Circuit Breaker feature called me out for making the same sign error 4 times.
                Embarrassing? Yes. But I haven't made that mistake since. It's like having a tutor
                who actually tracks your patterns."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div>
                  <div className="testimonial-name">Priya S.</div>
                  <div className="testimonial-detail">Class 12, CBSE · Self-studying for JEE</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass">
              <div className="testimonial-content">
                "My son was spending 4 hours daily on physics but scores weren't moving. I realized
                he was just reading solutions and feeling productive. Two months with PhysiScaffold
                and he's actually solving problems on his own. The change is visible."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">R</div>
                <div>
                  <div className="testimonial-name">Rajesh M.</div>
                  <div className="testimonial-detail">Parent · Son preparing for JEE 2025</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass">
              <div className="testimonial-content">
                "The Feynman prompts are brutal. You think you understand something until you try
                to explain it simply. I've relearned concepts I thought I knew for 2 years.
                Wish I'd found this earlier."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">V</div>
                <div>
                  <div className="testimonial-name">Vikram T.</div>
                  <div className="testimonial-detail">Dropper · JEE 2025 attempt</div>
                </div>
              </div>
            </div>
          </div>
          <div className="social-proof-stats">
            <div className="stat-item">
              <div className="stat-value">87%</div>
              <div className="stat-label">of beta users report improved problem-solving confidence</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3.2x</div>
              <div className="stat-label">more problems solved independently after 30 days</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">94%</div>
              <div className="stat-label">would recommend to a friend preparing for JEE</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section theme-stack scroll-reveal" id="faq">
          <div className="section-head">
            <div>
              <p className="eyebrow">Common Questions</p>
              <h2>You're probably wondering...</h2>
            </div>
          </div>
          <div className="faq-grid">
            <div className="faq-item glass">
              <div className="faq-question">"I already go to coaching. Why do I need this?"</div>
              <div className="faq-answer">
                Coaching gives you content and solutions. But can you solve new problems alone at 2 AM
                before the exam? PhysiScaffold builds the independent thinking that coaching can't—because
                a teacher with 40 students can't guide your individual reasoning on every problem. We can.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"Can't I just use ChatGPT? It's free."</div>
              <div className="faq-answer">
                ChatGPT gives you answers. That's exactly the problem. It feels productive, but you're
                outsourcing your thinking. PhysiScaffold never gives you the answer—it makes you find it.
                That's uncomfortable, but it's the only way your brain actually learns to solve problems.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"What if my basics are weak?"</div>
              <div className="faq-answer">
                Good—we'll find out exactly where. Our prerequisite checks identify gaps before you waste
                time on problems you're not ready for. And our mistake tracking shows patterns: maybe it's
                not "basics" but specific concepts like sign conventions or free body diagrams. We pinpoint it.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"Why the daily limits? I want to practice more."</div>
              <div className="faq-answer">
                Research is clear: cramming 20 problems superficially builds less than deeply engaging with 5.
                The limits force you to think harder on each problem instead of rushing to the next one.
                Students who complain about limits usually aren't finishing what they start anyway.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"How is this different from video solutions?"</div>
              <div className="faq-answer">
                Videos are passive—you watch someone else think. It feels like learning but it's entertainment.
                PhysiScaffold is active—you do the thinking, with guidance. It's harder, slower, and less
                satisfying in the moment. But it's the only method that builds actual problem-solving ability.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"Does this work for NEET Physics too?"</div>
              <div className="faq-answer">
                Yes. While our problems skew toward JEE-level difficulty, the methodology works for any
                physics exam. NEET physics requires the same conceptual clarity—you just need fewer
                advanced mechanics problems. The thinking skills transfer completely.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"What if it doesn't work for me?"</div>
              <div className="faq-answer">
                If you use PhysiScaffold consistently for 30 days and don't see improvement in your ability
                to approach new problems independently, something is wrong. Reach out—we'll look at your
                usage patterns and figure out what's not clicking. We're not interested in taking money
                from students we can't help.
              </div>
            </div>
            <div className="faq-item glass">
              <div className="faq-question">"I've tried other apps. They didn't help."</div>
              <div className="faq-answer">
                Most "learning apps" are answer engines with better UI. They optimize for engagement, not
                understanding. We're different because we're building for one metric: can you solve problems
                you've never seen before? Everything else—streaks, points, badges—is distraction.
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta glass theme-cta" id="contact">
          <div>
            <p className="eyebrow">Limited Access</p>
            <h3>Every day you wait is another day of learning wrong</h3>
            <p className="lede">
              The students who crack JEE aren't smarter—they just learned how to think earlier.
              PhysiScaffold is in private beta. Spots are limited because real guidance takes resources.
              Don't let another month pass wondering why your scores won't budge.
            </p>
          </div>
          <div className="cta-side">
            <div className="cta-actions">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Request early access
              </button>
              <a className="btn btn-ghost" href="#features">
                Explore all features
              </a>
            </div>
            {showWhatsApp ? (
              <div className="contact-card glass">
                <div className="label">WhatsApp</div>
                <div className="mono">3123201715</div>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <div className="logo-mark">Φ</div>
          <div>
            <div className="brand-title">PhysiScaffold</div>
            <div className="brand-subtitle">Your Physics Thinking Partner</div>
          </div>
        </div>
        <div className="footer-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#quotas">Access</a>
        </div>
        <div className="mono">The confidence to solve anything.</div>
      </footer>

      <div className={`shortcut-banner ${toastActive ? "active" : ""}`}>{toastMessage}</div>
      <div className={`autosave-indicator ${autosaveStatus === "syncing" ? "syncing" : ""}`}>
        {autosaveStatus === "syncing" ? "Saving..." : "Saved"}
      </div>

      {/* Floating CTA */}
      <div className={`floating-cta ${showFloatingCTA ? "visible" : ""}`}>
        <button className="btn" type="button" onClick={revealWhatsApp}>
          Request early access
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="label">{title}</div>
      <p>{children}</p>
    </div>
  );
}

function FeatureCard({
  title,
  tag,
  children
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="label">{title}</div>
      <p>{children}</p>
      <div className="mono muted">{tag}</div>
    </div>
  );
}

function Quota({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="quota-value">{value}</div>
    </div>
  );
}
