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
    { label: "Scaffolds", value: "5 / day" },
    { label: "Hint generations", value: "10 / day" },
    { label: "Prerequisite checks", value: "2 / day" },
    { label: "Reflections", value: "2 / day" },
    { label: "Problem variations", value: "2 / day" }
  ];

  const mathSnippet =
    "\\frac{d}{dt}\\left(m r^2 \\omega\\right) = 0 \\Rightarrow \\omega(r_0) = \\sqrt{\\frac{k}{m r_0^3}}";

  return (
    <div>
      <div className="bg-ornament" aria-hidden />
      <header className="nav">
        <div className="brand">
          <div className="logo-mark">Φ</div>
          <div>
            <div className="brand-title">PhysiScaffold</div>
            <div className="brand-subtitle">The Socratic Physics Engine</div>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#product">Product</a>
          <a href="#solver">Solver</a>
          <a href="#learning">Learning</a>
          <a href="#analytics">Analytics</a>
          <a href="#pages">Pages</a>
          <a href="#quotas">Access</a>
        </nav>
        <div className="nav-cta">
          <span className="badge badge-ghost">Built for clarity</span>
          <button className="btn" type="button" onClick={revealWhatsApp}>
            Request access
          </button>
        </div>
      </header>

      <main>
        <section className="hero theme-core" id="product">
          <div className="hero-copy glass">
            <div className="eyebrow">Socratic Physics · Precision first</div>
            <h1>
              Teach problem-solving,
              <br />
              not answer-hunting.
            </h1>
            <p className="lede">
              PhysiScaffold scaffolds your solutions, probes prerequisites, and warns about
              mistakes before you make them. When a final answer is wrong, a professor-led
              chat steps in to diagnose gaps and guide understanding.
            </p>
            <div className="pill-row">
              <span className="pill">Solution roadmaps</span>
              <span className="pill">5-level hints</span>
              <span className="pill">Prerequisite checks</span>
              <span className="pill">Diagram upload</span>
              <span className="pill">Professor chat recovery</span>
              <span className="pill">Audio hint dialogues</span>
            </div>
            <div className="cta-row">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Request access
              </button>
              <a className="btn btn-ghost" href="#solver">
                See how it scaffolds
              </a>
            </div>
            <div className="pilot-codes glass">
              <div>
                <div className="label">Daily usage limits</div>
                <div className="codes">Balanced for focus and depth</div>
              </div>
              <div className="usage">
                <div>5 scaffolds/day</div>
                <div>10 hint generations</div>
                <div>2 prerequisite checks</div>
                <div>2 reflections</div>
                <div>2 problem variations</div>
              </div>
            </div>
            <div className="shortcut-tip">Keyboard: N new · H history · S study path · ? help</div>
          </div>
          <div className="hero-panel glass" id="solver">
            <div className="panel-head">
              <div>
                <div className="label">Socratic solving console</div>
                <div className="muted">Stepwise guidance · professor-led checks</div>
              </div>
              <div className="badge flash">Auto-save 30s</div>
            </div>
            <div className="problem-card">
              <div className="label">Problem</div>
              <div className="prompt">
                A particle of mass m moves in a circular path of radius r under a central force F = k/r². Find its
                angular velocity when released from rest at r₀.
              </div>
              <div className="prereq-check">
                <div className="label">Prerequisite check</div>
                <div className="prereq-tags">
                  <span className="pill pill-ghost">Centripetal force</span>
                  <span className="pill pill-ghost">Energy conservation</span>
                  <span className="pill pill-ghost">Inverse-square fields</span>
                </div>
                <div className="prereq-status good">Ready · 92%</div>
              </div>
              <div className="hint-stack">
                <div className="hint">
                  <div className="label">Pass 1 · Roadmap</div>
                  <p>Frame energy balance → relate v to r → identify conserved quantity.</p>
                </div>
                <div className="hint">
                  <div className="label">Hint level 2</div>
                  <p>Write total energy E = T + V, with V(r) from integrating k/r².</p>
                </div>
                <div className="hint">
                  <div className="label">Hint level 4</div>
                  <p>Use v = ωr and solve for ω at r₀ after simplifying energy terms.</p>
                </div>
              </div>
              <div className="warning">Common mistake: forgetting negative sign in potential.</div>
            </div>
            <div className="mini-metrics">
              <div className="chip">
                <div className="label">Spot the mistake</div>
                <div className="mono">2 flagged in last 10 solves</div>
              </div>
              <div className="chip">
                <div className="label">Daily debrief</div>
                <div className="mono">Cards due: 8 · Reviewed: 5</div>
              </div>
              <div className="chip">
                <div className="label">Concept network</div>
                <div className="mono">19 nodes mastered · 6 weak</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section theme-core" id="learning">
          <div className="section-head">
            <div>
              <p className="eyebrow">Problem-solving engine</p>
              <h2>Scaffold every step, without giving the answer away.</h2>
            </div>
            <a className="btn btn-ghost" href="#pages">
              See product surfaces
            </a>
          </div>
          <div className="grid cards">
            <Card title="Solution scaffolding">
              A two-pass guide builds a plan first, then reveals equations progressively without giving away the final
              numeric answer.
            </Card>
            <Card title="Progressive hints">
              Five levels: conceptual cues → governing equations → substitution → simplification → full worked solution
              when you choose.
            </Card>
            <Card title="Prerequisite checks">
              Lightweight quizzes validate readiness before deep solving. Redirects to remedial nodes when gaps surface.
            </Card>
            <Card title="Error anticipation">
              Warns about sign slips, units, and missing free-body details ahead of time, so you learn to avoid them.
            </Card>
            <Card title="Professor follow-up chat">
              If the final solution is wrong, a guided chat opens to ask questions, isolate misconceptions, and rebuild
              intuition step by step.
            </Card>
            <Card title="Audio hint dialogues">
              Each hint level includes a short, podcast-style exchange between student and professor to reinforce
              reasoning out loud.
            </Card>
            <Card title="Diagram support">Upload or snap a circuit/rig diagram; OCR and structural parsing keep the scaffold aligned.</Card>
          </div>
          <MathSnippet latex={mathSnippet} />
        </section>

        <section className="section theme-core" id="features">
          <div className="section-head">
            <div>
              <p className="eyebrow">Full feature set</p>
              <h2>Everything designed to turn attempts into understanding.</h2>
            </div>
          </div>
          <div className="feature-group">
            <div className="feature-title">Core guidance</div>
            <div className="grid cards">
              <FeatureCard title="Solution roadmaps" tag="Core flow">
                Two-pass scaffolding builds a plan first, then reveals equations progressively.
              </FeatureCard>
              <FeatureCard title="5-level hints" tag="Guided discovery">
                Unlock conceptual cues → equations → substitutions → simplification → full solution.
              </FeatureCard>
              <FeatureCard title="Prerequisite checks" tag="Readiness">
                Quick checks validate fundamentals before deep solving begins.
              </FeatureCard>
              <FeatureCard title="Professor follow-up chat" tag="Recovery mode">
                If the final answer is wrong, a professor-led chat diagnoses gaps and rebuilds intuition.
              </FeatureCard>
              <FeatureCard title="Audio hint dialogues" tag="Podcast style">
                Each hint level includes a short student-professor exchange to reinforce reasoning aloud.
              </FeatureCard>
              <FeatureCard title="Error anticipation" tag="Mistake prevention">
                Flags unit slips, sign errors, and missing free-body details before they derail you.
              </FeatureCard>
              <FeatureCard title="Diagram upload" tag="Visual support">
                OCR and parsing keep the scaffold aligned with your circuit or rig sketch.
              </FeatureCard>
            </div>
          </div>
          <div className="feature-group">
            <div className="feature-title">Learning systems</div>
            <div className="grid cards">
              <FeatureCard title="Study path" tag="Curriculum">
                Structured concept map with checkpoints and spaced repetition.
              </FeatureCard>
              <FeatureCard title="Problem variations" tag="Mastery">
                Generate adjacent problems to test transfer, not memorization.
              </FeatureCard>
              <FeatureCard title="Spot the mistake" tag="Examiner mode">
                Debug flawed solutions to learn typical traps and shortcuts.
              </FeatureCard>
              <FeatureCard title="Feynman technique" tag="Clarity">
                Explain ideas in simple terms to stress-test your understanding.
              </FeatureCard>
              <FeatureCard title="Paper upload" tag="Bring your work">
                Handwritten solutions get Socratic feedback on every step.
              </FeatureCard>
            </div>
          </div>
          <div className="feature-group">
            <div className="feature-title">Analytics and recall</div>
            <div className="grid cards">
              <FeatureCard title="Concept network" tag="Mastery map">
                Visual graph of dependencies and weak nodes for targeted practice.
              </FeatureCard>
              <FeatureCard title="Mistake notebook" tag="Retention">
                Spaced repetition cards for errors you personally made.
              </FeatureCard>
              <FeatureCard title="Problem history" tag="Audit trail">
                Full log of attempts, hints taken, and reflections.
              </FeatureCard>
            </div>
          </div>
        </section>

        <section className="section theme-learn">
          <div className="section-head">
            <div>
              <p className="eyebrow">Learning tools</p>
              <h2>Practice like an examiner designed your week.</h2>
            </div>
          </div>
          <div className="grid cards">
            <Card title="Study path">Structured curriculum map with checkpoints and spaced repetition to keep physics fresh.</Card>
            <Card title="Problem variations">Create adjacent problems to expose pattern mastery, not rote memory.</Card>
            <Card title="Spot the mistake">Debug intentionally flawed solutions to internalize examiner heuristics.</Card>
            <Card title="Feynman technique">Generate grade-7 explanations to pressure-test your understanding.</Card>
            <Card title="Paper upload">OCR handwritten work; get Socratic feedback on your own steps.</Card>
          </div>
        </section>

        <section className="section theme-analytics" id="analytics">
          <div className="section-head">
            <div>
              <p className="eyebrow">Analytics & tracking</p>
              <h2>Make mistakes visible, then fix them deliberately.</h2>
            </div>
          </div>
          <div className="grid cards">
            <Card title="Concept network">Visual map of every concept, colored by mastery and connected by dependency.</Card>
            <Card title="Error pattern analytics">Unit slips, sign errors, diagram misreads—tracked across attempts with remediation tips.</Card>
            <Card title="Mistake notebook">Spaced repetition cards for your own errors, surfaced daily in a debrief.</Card>
            <Card title="Problem history">Full audit trail: drafts, hints taken, attempts, and reflections.</Card>
          </div>
          <ConceptFlow />
        </section>

        <section className="section theme-pages" id="pages">
          <div className="section-head">
            <div>
              <p className="eyebrow">Product surfaces</p>
              <h2>Seven focused pages to keep you in flow.</h2>
            </div>
          </div>
          <div className="grid pages">
            <PageCard path="Home (/)" copy="Primary solving interface with scaffolding, hints, and voice input." />
            <PageCard path="Study Path (/study-path)" copy="Curriculum navigator with streaks, progress, and topic readiness." />
            <PageCard path="History (/history)" copy="Filter attempts by topic, error type, and hint usage." />
            <PageCard path="Concept Network (/concept-network)" copy="Interactive graph; zoom into weak nodes and launch remedial drills." />
            <PageCard path="Spot Mistake (/spot-mistake)" copy="Gallery of flawed solutions designed for quick error hunts." />
            <PageCard path="Error Patterns (/error-patterns)" copy="Dashboard of recurring mistakes with auto-generated remediation plans." />
            <PageCard path="Equation Demo (/equation-demo)" copy="Sandbox to render and share equations clearly." />
          </div>
        </section>

        <section className="section theme-access" id="quotas">
          <div className="section-head">
            <div>
              <p className="eyebrow">Access and limits</p>
              <h2>Designed for focus, not overload.</h2>
            </div>
            <div className="badge">Resets daily at midnight</div>
          </div>
          <div className="quota-grid glass">
            {quotas.map((q) => (
              <Quota key={q.label} label={q.label} value={q.value} />
            ))}
          </div>
        </section>

        <section className="section theme-stack" id="stack">
          <div className="section-head">
            <div>
              <p className="eyebrow">How it feels</p>
              <h2>Fast, focused, and built for real study sessions.</h2>
            </div>
          </div>
          <div className="grid cards">
            <Card title="Guided by logic">Step-by-step flow that keeps you reasoning, not guessing.</Card>
            <Card title="Math-native">Equations, symbols, and derivations stay readable and structured.</Card>
            <Card title="Fast feedback">Hints, checks, and reflections show up right when you need them.</Card>
            <Card title="Learning memory">Your mistakes and progress are remembered for review.</Card>
            <Card title="Study-ready">Shortcuts, voice input, and mobile-friendly layouts support long sessions.</Card>
          </div>
        </section>

        <section className="cta glass theme-cta" id="contact">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h3>Bring PhysiScaffold to your classroom or study group.</h3>
            <p className="lede">
              Built for students, parents, and teachers who want real understanding, not shortcuts.
            </p>
          </div>
          <div className="cta-side">
            <div className="cta-actions">
              <button className="btn" type="button" onClick={revealWhatsApp}>
                Request access
              </button>
              <a className="btn btn-ghost" href="#product">
                Review capabilities
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
          <a href="#product">Product</a>
          <a href="#pages">Surfaces</a>
          <a href="#quotas">Access</a>
          <a href="#stack">Stack</a>
        </div>
        <div className="mono">Auto-save active · keyboard shortcuts ready</div>
      </footer>

      <div className={`shortcut-banner ${toastActive ? "active" : ""}`}>{toastMessage}</div>
      <div className={`autosave-indicator ${autosaveStatus === "syncing" ? "syncing" : ""}`}>
        Auto-save: {autosaveStatus}
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

function PageCard({ path, copy }: { path: string; copy: string }) {
  return (
    <div className="page-card glass">
      <div className="label">{path}</div>
      <p>{copy}</p>
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
