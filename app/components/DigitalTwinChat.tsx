"use client";

import { FormEvent, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "What kind of engineer is Ronen?",
  "Tell me about Ronen's KoiosTech experience.",
  "What AI projects has Ronen built?",
  "What makes Ronen strong in backend work?",
];

const initialMessages: Message[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Hi, I am Ronen's digital twin. Ask me about his career journey, engineering experience, skills, projects, or leadership background.",
  },
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function sendMessage(question?: string) {
    const content = (question ?? input).trim();

    if (!content || isSending) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      const reply = data.reply;

      if (!response.ok || !reply) {
        throw new Error(data.error ?? "The digital twin did not respond.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : "Something went wrong while asking the digital twin.";

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: fallback,
        },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  function openChat() {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="floatingChat">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Ronen AI chat" : "Open Ronen AI chat"}
        className="chatLauncher"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        type="button"
      >
        <span className="chatLauncherIcon">RG</span>
        <span className="chatLauncherText">Ask Ronen AI</span>
      </button>

      {isOpen ? (
        <div className="chatShell" role="dialog" aria-label="Ronen AI chat">
          <div className="chatHeader">
            <div>
              <p className="chatStatus">AI digital twin</p>
              <h3>Ask Ronen anything</h3>
            </div>
            <button
              aria-label="Close chat"
              className="chatClose"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              x
            </button>
          </div>

          <div className="chatMessages" aria-live="polite">
            {messages.map((message) => (
              <div className={`chatBubble ${message.role}`} key={message.id}>
                <span>{message.role === "assistant" ? "Ronen AI" : "You"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {isSending ? (
              <div className="chatBubble assistant">
                <span>Ronen AI</span>
                <p>Thinking through Ronen&apos;s experience...</p>
              </div>
            ) : null}
          </div>

          <div className="promptGrid" aria-label="Suggested questions">
            {starterQuestions.map((question) => (
              <button
                disabled={isSending}
                key={question}
                onClick={() => void sendMessage(question)}
                type="button"
              >
                {question}
              </button>
            ))}
          </div>

          <form className="chatForm" onSubmit={handleSubmit}>
            <textarea
              aria-label="Ask Ronen's digital twin a question"
              disabled={isSending}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder="Ask about Ronen's backend experience, AI work, career journey..."
              ref={inputRef}
              rows={2}
              value={input}
            />
            <button disabled={isSending || input.trim().length === 0} type="submit">
              {isSending ? "Sending" : "Ask"}
            </button>
          </form>
          <p className="chatDisclaimer">
            Answers are grounded in Ronen&apos;s resume and portfolio content.
          </p>
        </div>
      ) : null}
    </div>
  );
}
