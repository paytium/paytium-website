const Arrow = () => <span aria-hidden="true">↗</span>;

const Spark = ({ small = false }: { small?: boolean }) => (
  <span className={small ? "spark spark-small" : "spark"} aria-hidden="true">✦</span>
);

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Paytium home">
          <img src="/logo-paytium.svg" alt="Paytium" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#results">Results</a>
          <a href="#stories">Stories</a>
        </nav>
        <a className="header-cta" href="#contact">Start a project <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> CLARITY, WITHOUT THE COMPLEXITY</p>
          <h1>Move your<br />business <em>forward.</em></h1>
          <p className="hero-lede">Paytium turns complex business data into a clear, shared plan—so your team knows what matters and what to do next.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">Build your roadmap <Arrow /></a>
            <a className="text-link" href="#platform">See how it works <span>↓</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Paytium product dashboard preview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-star paytium-icon"><img src="/logo-paytium.svg" alt="" /></div>
          <div className="float-card momentum-card">
            <div className="card-top"><span>Momentum score</span><span className="live-dot">Live</span></div>
            <strong>87<span>/100</span></strong>
            <div className="meter"><i /></div>
            <small>↑ 14% this quarter</small>
          </div>
          <div className="float-card goal-card">
            <p><span className="check">✓</span> Q3 PRIORITY</p>
            <strong>Expand to Europe</strong>
            <div className="avatars"><span>AM</span><span>JL</span><span>SK</span><b>+4</b></div>
          </div>
          <div className="micro-note note-one"><span>01</span> ALIGN</div>
          <div className="micro-note note-two"><span>02</span> ACT</div>
        </div>
      </section>

      <section className="logo-strip" aria-label="Trusted companies">
        <p>Trusted by ambitious teams at</p>
        <div><b>LOOM</b><b>Arc’teryx</b><b>vercel</b><b>Notion</b><b>linear</b></div>
      </section>

      <section className="intro section" id="platform">
        <p className="section-kicker">ONE CLEAR DIRECTION</p>
        <div className="intro-heading">
          <h2>Great strategy should<br />feel <em>obvious.</em></h2>
          <p>We connect your goals, metrics, and daily work in one living system. Less reporting. Fewer status meetings. More meaningful progress.</p>
        </div>

        <div className="feature-grid">
          <article className="feature feature-large">
            <div className="feature-number">01</div>
            <div className="mini-product">
              <div className="mini-nav"><Spark small /><span /><span /><span /></div>
              <div className="mini-content">
                <small>COMPANY DIRECTION</small>
                <h3>Win the next<br />chapter.</h3>
                <div className="progress-row"><span>Revenue growth</span><b>78%</b></div>
                <div className="progress-line"><i /></div>
                <div className="progress-row"><span>Customer love</span><b>92%</b></div>
                <div className="progress-line second"><i /></div>
              </div>
            </div>
            <div className="feature-copy">
              <h3>See the whole picture.</h3>
              <p>Bring goals, insights, and metrics together. Everyone sees the same reality—and the path ahead.</p>
            </div>
          </article>

          <article className="feature feature-small coral">
            <div className="feature-number">02</div>
            <div className="pulse-rings"><i /><i /><span><Spark /></span></div>
            <div className="feature-copy">
              <h3>Spot what matters.</h3>
              <p>Paytium surfaces risks and opportunities before they turn into surprises.</p>
            </div>
          </article>

          <article className="feature feature-small ink">
            <div className="feature-number">03</div>
            <div className="stacked-plans">
              <div><small>NEXT BEST MOVE</small><b>Launch pricing experiment</b></div>
              <div><small>OWNER</small><b>Growth team</b></div>
              <div><small>IMPACT</small><b>High</b></div>
            </div>
            <div className="feature-copy">
              <h3>Turn insight into action.</h3>
              <p>Translate decisions into focused work, with ownership built in from day one.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="results section" id="results">
        <div>
          <p className="section-kicker">PROGRESS YOU CAN FEEL</p>
          <h2>Less drift.<br /><em>More momentum.</em></h2>
        </div>
        <div className="stats">
          <article><strong>3.2×</strong><p>faster strategic decisions</p></article>
          <article><strong>42%</strong><p>fewer status meetings</p></article>
          <article><strong>91%</strong><p>of teams feel more aligned</p></article>
        </div>
      </section>

      <section className="story section" id="stories">
        <div className="story-card">
          <div className="quote-mark">“</div>
          <blockquote>Paytium didn’t give us more data. It gave us the confidence to make the right call—and move.</blockquote>
          <div className="person"><span>MV</span><p><strong>Maya Velasquez</strong><small>COO, Current</small></p></div>
        </div>
        <div className="story-side">
          <p className="section-kicker">THE CURRENT STORY</p>
          <h2>From busy<br />to <em>breakthrough.</em></h2>
          <p>See how Current aligned 180 people around one strategy—and entered three new markets in twelve months.</p>
          <a className="text-link light" href="#contact">Read the story <Arrow /></a>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="cta-star"><Spark /></div>
        <p className="section-kicker">YOUR NEXT MOVE STARTS HERE</p>
        <h2>Ready to move<br />with <em>clarity?</em></h2>
        <p>Let’s turn your biggest ambitions into a plan your whole team can move on.</p>
        <a className="button button-coral" href="mailto:hello@paytium.example">Start a conversation <Arrow /></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><img src="/logo-paytium.svg" alt="Paytium" /></a>
        <p>Clarity for ambitious teams.</p>
        <div><a href="#platform">Platform</a><a href="#stories">Stories</a><a href="mailto:hello@paytium.example">Contact</a></div>
        <small>© 2026 Paytium, Inc.</small>
      </footer>
    </main>
  );
}
