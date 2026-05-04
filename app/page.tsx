const careerHighlights = [
  {
    value: "2+",
    label: "Years building production software",
  },
  {
    value: "Hourly",
    label: "Near-real-time market sentiment alerts",
  },
  {
    value: "AWS",
    label: "Dockerized workloads on EC2, S3, and ECR",
  },
];

const timeline = [
  {
    period: "2023 - 2025",
    title: "Software Engineer, KoiosTech",
    description:
      "Built data-driven tools, microservices, and AI-powered pipelines that analyze investor chatter and turn market conversations into actionable client insights.",
    points: [
      "Operated Dockerized workloads orchestrated with Airflow on AWS, including production Linux automation for reliability and log cleanup.",
      "Expanded web-scraping coverage with YouTube API integrations and market chatter sources including Twitter/X, Reddit, and StockTwits.",
      "Built hourly sentiment monitoring that detects major positive and negative shifts and surfaces alerts for market-moving changes.",
      "Improved responsive platform experiences across desktop, tablet, and mobile.",
    ],
  },
  {
    period: "2021",
    title: "B.Sc. Computer Science, Ben-Gurion University",
    description:
      "Built the technical foundation for backend systems, algorithms, software architecture, and data-oriented product development.",
    points: [
      "Focused on practical engineering fundamentals that later shaped production backend, frontend, and infrastructure work.",
    ],
  },
  {
    period: "2013 - 2016",
    title: "Golani Sabotage & Engineering Unit, IDF",
    description:
      "Served in a demanding operational environment that developed ownership, discipline, calm execution, and team leadership.",
    points: [
      "Led a team during missions while consistently meeting high physical and mental standards.",
    ],
  },
];

const skillGroups = [
  {
    title: "AI & Data Products",
    skills: [
      "OpenAI API",
      "Investor chatter analysis",
      "Sentiment detection",
      "AI summarization",
      "Structured GPT outputs",
    ],
  },
  {
    title: "Backend & Microservices",
    skills: [
      "Node.js",
      "TypeScript",
      "Python",
      "Express.js",
      "REST APIs",
      "MVC architecture",
      "Web-scraping pipelines",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      "Docker",
      "AWS EC2",
      "AWS S3",
      "AWS ECR",
      "Airflow",
      "Linux",
      "Git",
      "Kafka",
      "RabbitMQ",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Material UI",
      "Responsive UI",
      "Cross-device usability",
      "SwiftUI",
    ],
  },
];

const projects = [
  {
    title: "CoachAI",
    eyebrow: "SwiftUI + GPT + Firestore",
    description:
      "A personal health assistant that analyzes food, workouts, and chat input with GPT, then stores structured logs in Firestore so users can track nutrition and fitness progress.",
    points: [
      "Designed structured JSON interactions with GPT to extract macros, workout details, and personalized guidance.",
      "Implemented authentication, data models, and CRUD flows with real-time synchronization.",
    ],
  },
  {
    title: "Market Intelligence Pipelines",
    eyebrow: "AWS + Airflow + AI summarization",
    description:
      "Production systems for processing large-scale investor chatter, identifying trending topics, and turning noisy data streams into readable insight.",
    points: [
      "Integrated multiple APIs and scraping sources into resilient ingestion workflows.",
      "Created summarization and sentiment services that help clients understand market narratives faster.",
    ],
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "Ronengershko12@gmail.com",
    href: "mailto:Ronengershko12@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "ronen-gershkovich",
    href: "https://www.linkedin.com/in/ronen-gershkovich-b510851a8/",
  },
  {
    label: "GitHub",
    value: "ronengershko",
    href: "https://www.github.com/ronengershko",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Ronen Gershkovich home">
            RG
          </a>
          <div className="navLinks">
            <a href="#about">About</a>
            <a href="#journey">Journey</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Software Engineer - Tel Aviv, Israel</p>
            <h1>Building AI-powered systems that turn data into decisions.</h1>
            <p className="heroText">
              I am Ronen Gershkovich, a software engineer focused on backend
              systems, cloud infrastructure, responsive products, and AI
              pipelines that transform high-volume market conversations into
              clear, actionable insight.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#work">
                Explore my work
              </a>
              <a className="secondaryButton" href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <aside className="heroCard" aria-label="Professional summary">
            <div className="orb orbOne" />
            <div className="orb orbTwo" />
            <p className="cardKicker">Current focus</p>
            <h2>AI, microservices, and cloud-native data workflows</h2>
            <p>
              Production experience across Docker, AWS, Airflow, API
              integrations, sentiment analytics, and responsive React
              interfaces.
            </p>
            <div className="signalRow">
              <span>OpenAI API</span>
              <span>Airflow</span>
              <span>React</span>
            </div>
          </aside>
        </div>

        <div className="statsGrid" aria-label="Career highlights">
          {careerHighlights.map((item) => (
            <div className="statCard" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section aboutSection" id="about">
        <div>
          <p className="eyebrow">About me</p>
          <h2>Practical engineer with a product mindset.</h2>
        </div>
        <div className="aboutCopy">
          <p>
            My work sits at the intersection of backend engineering, data
            infrastructure, and user-facing product quality. At KoiosTech, I
            helped build systems that collect financial chatter, process it
            through reliable pipelines, and surface meaningful sentiment and
            trend signals for clients.
          </p>
          <p>
            I care about systems that keep running, interfaces that feel fast on
            every device, and AI features that produce structured, useful output
            instead of noise. My background also includes military leadership in
            the Golani Sabotage & Engineering Unit, where discipline,
            responsibility, and execution under pressure became part of how I
            work.
          </p>
        </div>
      </section>

      <section className="section" id="journey">
        <div className="sectionHeader">
          <p className="eyebrow">Career journey</p>
          <h2>From disciplined field leadership to production engineering.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timelineItem" key={item.title}>
              <div className="timelinePeriod">{item.period}</div>
              <div className="timelineContent">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="sectionHeader">
          <p className="eyebrow">Capabilities</p>
          <h2>Full-stack delivery with a strong backend and infrastructure core.</h2>
        </div>
        <div className="skillsGrid">
          {skillGroups.map((group) => (
            <article className="skillCard" key={group.title}>
              <h3>{group.title}</h3>
              <div className="chips">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="sectionHeader">
          <p className="eyebrow">Selected work</p>
          <h2>Systems that combine data, AI, and practical product value.</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <p className="projectEyebrow">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contactSection" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let us build something useful.</h2>
          <p>
            I am open to software engineering opportunities where backend
            systems, AI workflows, infrastructure, and polished user experiences
            matter.
          </p>
        </div>
        <div className="contactCard">
          {contactLinks.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
