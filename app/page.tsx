"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MathSnippet } from "@/components/MathSnippet";

const ConceptFlow = dynamic(() => import("@/components/ConceptFlow"), { ssr: false });

export default function HomePage() {
  const [toastMessage, setToastMessage] = useState("Shortcuts ready: N new · H history · S study path · ? help");
  const [toastActive, setToastActive] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<"synced" | "syncing">("synced");
  const [showWhatsApp, setShowWhatsApp] = useState(false);

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
          <a href="#demo">Demo</a>
          <a href="#features">Features</a>
          <a href="#quotas">Access</a>
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
            <div className="eyebrow">Socratic Physics Tutor</div>
            <h1>
              Learn to solve problems,
              <br />
              not just get answers.
            </h1>
            <p className="lede">
              PhysiScaffold breaks down complex physics problems into logical steps,
              guiding your reasoning with Socratic questions and progressive hints.
              You do the thinking. We provide the structure.
            </p>
            <div className="value-props">
              <div className="value-prop">
                <div className="value-icon">1</div>
                <div>
                  <strong>Paste any problem</strong>
                  <span>Text or image upload</span>
                </div>
              </div>
              <div className="value-prop">
                <div className="value-icon">2</div>
                <div>
                  <strong>Get a solution roadmap</strong>
                  <span>Steps, not answers</span>
                </div>
              </div>
              <div className="value-prop">
                <div className="value-icon">3</div>
                <div>
                  <strong>Unlock hints as needed</strong>
                  <span>5 levels of guidance</span>
                </div>
              </div>
            </div>
            <div className="cta-row">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Request access
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
        <section className="section theme-learn" id="how-it-works">
          <div className="section-head">
            <div>
              <p className="eyebrow">The Complete Flow</p>
              <h2>From problem to understanding in 6 steps</h2>
            </div>
          </div>

          <div className="flow-container">
            <div className="flow-step">
              <div className="flow-number">1</div>
              <div className="flow-content">
                <h3>Enter Your Problem</h3>
                <p>Paste any physics problem as text, or upload an image of a diagram.
                   Works with mechanics, electromagnetism, thermodynamics, and more.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Text input</span>
                  <span className="pill pill-ghost">Image upload</span>
                  <span className="pill pill-ghost">Problem library</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">2</div>
              <div className="flow-content">
                <h3>Prerequisite Check (Optional)</h3>
                <p>Quick 2-3 question quiz to verify you have the foundational concepts.
                   If gaps are found, you're guided to strengthen them first.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Concept quiz</span>
                  <span className="pill pill-ghost">Gap detection</span>
                  <span className="pill pill-ghost">Remediation</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step highlight">
              <div className="flow-number">3</div>
              <div className="flow-content">
                <h3>Get Your Solution Roadmap</h3>
                <p>Your problem is broken into 4-6 logical milestones. Each step has a
                   Socratic question to guide your thinking, plus a concept inventory
                   showing relevant formulas and definitions.</p>
                <div className="flow-detail">
                  <span className="pill">Logical milestones</span>
                  <span className="pill">Socratic questions</span>
                  <span className="pill">Concept reference</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step highlight">
              <div className="flow-number">4</div>
              <div className="flow-content">
                <h3>Unlock Progressive Hints</h3>
                <p>Stuck? Each step has 5 levels of hints, from abstract conceptual nudges
                   to full worked solutions. Unlock only what you need.</p>
                <div className="hint-ladder">
                  <div className="hint-level">
                    <span className="hint-label">Level 1</span>
                    <span className="hint-desc">Concept identification - "What physics applies here?"</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 2</span>
                    <span className="hint-desc">Visualization - "How would you sketch this?"</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 3</span>
                    <span className="hint-desc">Strategy - "What approach works best?"</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 4</span>
                    <span className="hint-desc">Equations - Shows governing equations symbolically</span>
                  </div>
                  <div className="hint-level">
                    <span className="hint-label">Level 5</span>
                    <span className="hint-desc">Full solution - Complete step-by-step derivation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">5</div>
              <div className="flow-content">
                <h3>Sanity Check Your Answer</h3>
                <p>Before finishing, verify your answer makes physical sense.
                   Test limiting cases, check dimensions, and validate symmetry.
                   Interactive debugger available if something seems off.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Limiting cases</span>
                  <span className="pill pill-ghost">Dimensional analysis</span>
                  <span className="pill pill-ghost">Interactive debugger</span>
                </div>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className="flow-step">
              <div className="flow-number">6</div>
              <div className="flow-content">
                <h3>Reflect & Build Mastery</h3>
                <p>Explain your solution as if teaching a friend. Answer reflection questions.
                   Then try similar variations to cement your understanding.</p>
                <div className="flow-detail">
                  <span className="pill pill-ghost">Explain to friend</span>
                  <span className="pill pill-ghost">Reflection questions</span>
                  <span className="pill pill-ghost">Problem variations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes It Different */}
        <section className="section theme-core" id="difference">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why PhysiScaffold?</p>
              <h2>Guidance, not answers. Reasoning, not copying.</h2>
            </div>
          </div>

          <div className="comparison-grid">
            <div className="comparison-card bad">
              <div className="comparison-header">
                <span className="comparison-icon">✕</span>
                <h4>Answer Engines</h4>
              </div>
              <ul>
                <li>Give you the answer immediately</li>
                <li>Explain the solution step-by-step</li>
                <li>You read passively</li>
                <li>No retention, no learning</li>
                <li>Creates dependency</li>
              </ul>
            </div>
            <div className="comparison-card good">
              <div className="comparison-header">
                <span className="comparison-icon">✓</span>
                <h4>PhysiScaffold</h4>
              </div>
              <ul>
                <li>Never shows the final answer</li>
                <li>Guides your reasoning with questions</li>
                <li>You do the thinking</li>
                <li>Builds neural connections</li>
                <li>Creates independent problem-solvers</li>
              </ul>
            </div>
          </div>

          <div className="key-insight glass">
            <div className="insight-icon">💡</div>
            <div>
              <strong>The key insight:</strong> PhysiScaffold uses a hidden two-pass system.
              First, an expert engine solves the problem completely (you never see this).
              Then, a teaching layer creates a scaffold from that solution, removing all answers
              but preserving the logical structure. You get the roadmap, not the destination.
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section theme-analytics" id="features">
          <div className="section-head">
            <div>
              <p className="eyebrow">Full Feature Set</p>
              <h2>Everything designed for deep understanding</h2>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Core Problem-Solving</div>
            <div className="grid cards">
              <FeatureCard title="Solution Roadmap" tag="Core">
                4-6 logical milestones that break complex problems into manageable steps.
                Each step unlocks sequentially as you progress.
              </FeatureCard>
              <FeatureCard title="5-Level Hints" tag="Guidance">
                From abstract conceptual nudges to full worked solutions.
                Unlock only what you need, preserving the challenge.
              </FeatureCard>
              <FeatureCard title="Socratic Questions" tag="Reasoning">
                Each step poses a question to guide your thinking.
                "What physics applies?" not "Use this formula."
              </FeatureCard>
              <FeatureCard title="Concept Inventory" tag="Reference">
                Expandable sidebar with definitions and formulas for
                every concept relevant to your problem.
              </FeatureCard>
              <FeatureCard title="Error Warnings" tag="Prevention">
                Common mistakes are anticipated and flagged before they happen.
                "Watch your sign conventions" appears at the right moment.
              </FeatureCard>
              <FeatureCard title="Sanity Checks" tag="Validation">
                Test limiting cases, verify dimensions, check symmetry.
                Ensure your answer makes physical sense.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Active Learning</div>
            <div className="grid cards">
              <FeatureCard title="Micro-Task Mode" tag="Engagement">
                Answer mini-questions to unlock insights. Wrong answers show explanations.
                Duolingo-style active learning.
              </FeatureCard>
              <FeatureCard title="Explain to Friend" tag="Metacognition">
                Write your explanation as if teaching someone. Get feedback on clarity,
                accuracy, and completeness.
              </FeatureCard>
              <FeatureCard title="Problem Variations" tag="Mastery">
                Get 2-3 variations with different numbers but same physics.
                Build fluency, not just one-time understanding.
              </FeatureCard>
              <FeatureCard title="Paper Upload" tag="Handwriting">
                Photograph your handwritten solution. Get Socratic feedback
                focusing on one issue at a time.
              </FeatureCard>
            </div>
          </div>

          <div className="feature-group">
            <div className="feature-title">Progress Tracking</div>
            <div className="grid cards">
              <FeatureCard title="Concept Network" tag="Visualization">
                Visual graph of how physics concepts connect. See your mastery
                level for each topic at a glance.
              </FeatureCard>
              <FeatureCard title="Mistake Patterns" tag="Analytics">
                Identifies recurring errors across problems. Sign slips, unit errors,
                missing forces—tracked and addressed.
              </FeatureCard>
              <FeatureCard title="Problem History" tag="Continuity">
                Auto-saves every 30 seconds. Resume exactly where you left off.
                Full audit trail of attempts and hints.
              </FeatureCard>
            </div>
          </div>

          <ConceptFlow />
        </section>

        {/* Quotas Section */}
        <section className="section theme-access" id="quotas">
          <div className="section-head">
            <div>
              <p className="eyebrow">Daily Limits</p>
              <h2>Designed for focus, not overload</h2>
            </div>
            <div className="badge">Resets at midnight</div>
          </div>
          <p className="quota-explanation">
            Quotas encourage deep engagement with each problem.
            These limits promote quality over quantity—real learning, not shortcuts.
          </p>
          <div className="quota-grid glass">
            {quotas.map((q) => (
              <Quota key={q.label} label={q.label} value={q.value} />
            ))}
          </div>
        </section>

        {/* Target Audience */}
        <section className="section theme-pages" id="audience">
          <div className="section-head">
            <div>
              <p className="eyebrow">Built For</p>
              <h2>Serious physics learners</h2>
            </div>
          </div>
          <div className="grid cards">
            <Card title="JEE/NEET Aspirants">
              Irodov and Kleppner-level problems. Builds the conceptual rigor needed
              for India's toughest engineering and medical entrance exams.
            </Card>
            <Card title="Self-Learners">
              Structure your independent study. Get expert-level guidance without
              a tutor. Work at your own pace with saved progress.
            </Card>
            <Card title="Students Wanting More">
              Go beyond classroom learning. Understand why solutions work,
              not just how to copy them.
            </Card>
            <Card title="Teachers & Parents">
              Give students a tool that builds independence, not dependence.
              Track their actual understanding, not just answer accuracy.
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta glass theme-cta" id="contact">
          <div>
            <p className="eyebrow">Early Access</p>
            <h3>Ready to learn physics the right way?</h3>
            <p className="lede">
              PhysiScaffold is in private beta. Request access to be among the first
              to experience Socratic physics tutoring that builds real understanding.
            </p>
          </div>
          <div className="cta-side">
            <div className="cta-actions">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Request access
              </button>
              <a className="btn btn-ghost" href="#how-it-works">
                Review how it works
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
            <div className="brand-subtitle">Socratic Physics Engine</div>
          </div>
        </div>
        <div className="footer-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#quotas">Access</a>
        </div>
        <div className="mono">Learn to reason, not just answer.</div>
      </footer>

      <div className={`shortcut-banner ${toastActive ? "active" : ""}`}>{toastMessage}</div>
      <div className={`autosave-indicator ${autosaveStatus === "syncing" ? "syncing" : ""}`}>
        {autosaveStatus === "syncing" ? "Saving..." : "Saved"}
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
