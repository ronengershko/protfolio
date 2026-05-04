import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = "openai/gpt-oss-120b";

const RONEN_CONTEXT = `
Ronen Gershkovich is a software engineer based in Tel Aviv, Israel.
Contact: Ronengershko12@gmail.com.
LinkedIn: https://www.linkedin.com/in/ronen-gershkovich-b510851a8/
GitHub: https://www.github.com/ronengershko

Education:
- B.Sc. in Computer Science, Ben-Gurion University, 2021.

Languages:
- Hebrew: native/bilingual.
- English: fluent.

Professional experience:
- Software Engineer at KoiosTech, 08/2023 - 09/2025.
- Developed data-driven tools, microservices, and AI-powered pipelines for analyzing investor chatter and delivering actionable client insights.
- Designed and operated Dockerized workloads orchestrated via Airflow on AWS EC2, S3, and ECR.
- Wrote, deployed, and configured Linux shell scripts to automate log cleanup and maintain production reliability.
- Expanded web-scraping data sources by integrating YouTube via the YouTube API.
- Built near-real-time hourly sentiment monitoring that identified spikes and drops in positive or negative sentiment and generated alerts for market-moving shifts.
- Improved web platform responsiveness and usability across mobile, tablet, and desktop.
- Built an AI-driven summarization microservice that analyzes large-scale investor chatter and extracts trending topics.

Skills:
- Infrastructure and DevOps: Docker, AWS EC2, AWS S3, AWS ECR, Airflow, Git, Linux, Kafka, RabbitMQ.
- Programming and scripting: Python, Node.js, TypeScript, JavaScript.
- Backend and microservices: REST APIs, Express.js, MVC architecture, microservices, web-scraping pipelines, YouTube API, Twitter/X API, Reddit API, StockTwits API, OpenAI API.
- Frontend: React, Material UI, responsive UI development.

Project:
- CoachAI: a SwiftUI personal health assistant that analyzes food, workouts, and chat inputs using GPT and stores structured logs in Firestore.
- CoachAI included structured JSON interactions with GPT to extract nutrition macros, workout details, and chat guidance.
- CoachAI included user authentication, data models, and CRUD operations with real-time synchronization.

IDF service:
- Golani Sabotage & Engineering Unit, 08/2013 - 08/2016.
- Led a team during missions, demonstrating responsibility and leadership.
- Maintained discipline and consistently met demanding physical and mental standards.
`;

const SYSTEM_PROMPT = `
You are Ronen Gershkovich's digital twin on his personal portfolio website.
Answer questions about Ronen's career, skills, background, projects, and working style using only the verified context below.
Speak in first person as Ronen when it feels natural, but do not pretend to be available in real time or make commitments.
Be concise, warm, confident, and professional. Prioritize useful answers for recruiters, hiring managers, collaborators, and engineers.
If a question asks about something not in the context, say that you do not have that detail from Ronen's resume and offer a related answer from the available facts.
Do not invent employers, dates, degrees, personal details, metrics, or links.
Write like a natural conversation with Ronen. Use plain sentences and short paragraphs.
Do not use markdown formatting, asterisks, bold text, bullet symbols, or numbered lists.

Verified context:
${RONEN_CONTEXT}
`;

function cleanReply(reply: string) {
  return reply
    .replace(/\*/g, "")
    .replace(/^\s*[-•]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}

function isValidMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    messages?: unknown;
  } | null;

  const messages = Array.isArray(body?.messages)
    ? body.messages.filter(isValidMessage).slice(-10)
    : [];

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "A user message is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Ronen Gershkovich Portfolio",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.45,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter request failed:", errorText);

      return NextResponse.json(
        { error: "The digital twin is unavailable right now." },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = cleanReply(data.choices?.[0]?.message?.content ?? "");

    if (!reply) {
      return NextResponse.json(
        { error: "The digital twin returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Digital twin route error:", error);

    return NextResponse.json(
      { error: "Something went wrong while contacting the digital twin." },
      { status: 500 },
    );
  }
}
