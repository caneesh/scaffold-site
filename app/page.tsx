"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(easeOut * end));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through demo steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const demoSteps = [
    { title: "Identify the Physics", hint: "What type of motion is this?", level: 1 },
    { title: "Set Up Energy Balance", hint: "Write the total energy equation", level: 2 },
    { title: "Apply Constraints", hint: "What's conserved here?", level: 3 },
    { title: "Solve & Verify", hint: "Check dimensions and limits", level: 4 },
  ];

  return (
    <div className="landing">
      <div className="bg-glow" aria-hidden />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-brand">
          <img src="/logo-dark.png" alt="PhysiScaffold" className="nav-logo" />
        </div>
        <a href="#waitlist" className="nav-cta">Get Early Access</a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="pulse" />
          Now in Private Beta
        </div>

        <h1 className="hero-title">
          Stop reading solutions.<br />
          <span className="gradient-text">Start solving problems.</span>
        </h1>

        <p className="hero-subtitle">
          PhysiScaffold is an AI tutor that guides you to the answer without ever giving it away.
          Built for JEE & NEET physics, powered by the Socratic method.
        </p>

        <div className="hero-cta">
          <a href="#waitlist" className="btn-primary">
            Join the Waitlist
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#how" className="btn-ghost">See How It Works</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value"><AnimatedCounter end={45} suffix="+" /></span>
            <span className="stat-label">Intelligent Features</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value"><AnimatedCounter end={8} /></span>
            <span className="stat-label">Physics Chapters</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value"><AnimatedCounter end={500} suffix="+" /></span>
            <span className="stat-label">Problem Types</span>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="demo-section" id="how">
        <div className="demo-header">
          <span className="section-tag">Live Preview</span>
          <h2>Watch the scaffold unfold</h2>
          <p>Every problem becomes a guided journey. No more blank-page anxiety.</p>
        </div>

        <div className="demo-container">
          <div className="demo-problem">
            <div className="demo-label">Your Problem</div>
            <div className="demo-text">
              A particle moves in a circular path under an inverse-square force F = k/r².
              Find the angular velocity when released from rest at radius r₀.
            </div>
          </div>

          <div className="demo-scaffold">
            {demoSteps.map((step, i) => (
              <div
                key={i}
                className={`scaffold-step ${i === activeStep ? 'active' : ''} ${i < activeStep ? 'completed' : ''}`}
              >
                <div className="step-indicator">
                  {i < activeStep ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  {(i === activeStep || i < activeStep) && (
                    <div className="step-hint">"{step.hint}"</div>
                  )}
                </div>
                <div className="step-level">
                  {[1, 2, 3, 4, 5].map((l) => (
                    <span
                      key={l}
                      className={`level-dot ${l <= step.level && i <= activeStep ? 'filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="demo-insight">
            <span className="insight-icon">💡</span>
            <span>5 levels of hints — from gentle nudge to full solution. You choose how much help you need.</span>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="diff-section">
        <div className="diff-header">
          <span className="section-tag">The Difference</span>
          <h2>Why not just use ChatGPT?</h2>
        </div>

        <div className="diff-grid">
          <div className="diff-card bad">
            <div className="diff-icon">🤖</div>
            <h3>ChatGPT / YouTube / Solutions</h3>
            <ul>
              <li>Gives you the answer instantly</li>
              <li>Feels productive but builds nothing</li>
              <li>Same confusion in the exam</li>
              <li>Dependency, not understanding</li>
            </ul>
          </div>
          <div className="diff-card good">
            <div className="diff-icon">🎯</div>
            <h3>PhysiScaffold</h3>
            <ul>
              <li>Guides your reasoning step-by-step</li>
              <li>You do the thinking, we keep you on track</li>
              <li>Confidence that transfers to exams</li>
              <li>Independence through productive struggle</li>
            </ul>
          </div>
        </div>

        <div className="diff-quote">
          <blockquote>
            "The brain only learns when it struggles. We give you just enough help to keep struggling productively."
          </blockquote>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-header">
          <span className="section-tag">Built Different</span>
          <h2>45+ features. One goal.</h2>
          <p>Every feature exists to make you a better problem solver.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔓</div>
            <h4>5-Level Scaffolding</h4>
            <p>From concept hints to full solutions. Unlock only what you need.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h4>Mistake Notebook</h4>
            <p>Tracks your error patterns. Spaced repetition ensures you never repeat them.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h4>Socratic Dialogue</h4>
            <p>Post-step comprehension checks. Prove you understood before moving on.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Pre-Flight Checks</h4>
            <p>Catches wrong formula usage before you waste 20 minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Confidence Tracking</h4>
            <p>Rate your confidence. We prioritize where you're overconfident but wrong.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h4>Feynman Technique</h4>
            <p>Explain it simply after solving. If you can't teach it, you don't know it.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="proof-section">
        <div className="proof-stats">
          <div className="proof-stat">
            <span className="proof-value"><AnimatedCounter end={87} suffix="%" /></span>
            <span className="proof-label">report improved problem-solving confidence</span>
          </div>
          <div className="proof-stat">
            <span className="proof-value">3.2x</span>
            <span className="proof-label">more problems solved independently</span>
          </div>
          <div className="proof-stat">
            <span className="proof-value"><AnimatedCounter end={94} suffix="%" /></span>
            <span className="proof-label">would recommend to a friend</span>
          </div>
        </div>

        <div className="testimonial">
          <p>
            "I used to look at Irodov solutions and think 'yeah, that makes sense.'
            But in exams, I'd blank. PhysiScaffold forced me to actually derive things myself.
            Now I can solve problems I've never seen before."
          </p>
          <div className="testimonial-author">
            <span className="author-avatar">A</span>
            <div>
              <strong>Arjun K.</strong>
              <span>JEE Advanced 2024 · 68 → 89 percentile in Physics</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="waitlist">
        <div className="cta-content">
          <span className="section-tag">Limited Access</span>
          <h2>Ready to actually learn physics?</h2>
          <p>
            PhysiScaffold is in private beta. Join the waitlist to get early access
            and start building real problem-solving ability.
          </p>

          {status === "success" ? (
            <div className="success-message">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <div>
                <strong>You're on the list!</strong>
                <span>Check your email for access details.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="waitlist-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                required
                className={status === "error" ? "error" : ""}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="error-text">Something went wrong. Please try again.</p>
          )}
          <p className="form-note">No spam. Just early access and updates.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="/logo-dark.png" alt="PhysiScaffold" className="footer-logo" />
        <p>The confidence to solve anything.</p>
      </footer>
    </div>
  );
}
