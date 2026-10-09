import { useEffect, useState, type FormEvent } from "react";
import { bands, practiceAreas, retainers, terms, type GroupId } from "@/lib/cdxi/catalog";
import { Planet } from "@/components/cdxi/Planet";
import { SectionIndex, Workbench } from "@/components/cdxi/Workbench";

const NAV = [
  { href: "#practice", label: "Practice" },
  { href: "#services", label: "Services" },
  { href: "#support", label: "Support" },
  { href: "#terms", label: "Terms" },
  { href: "#begin", label: "Begin" },
];

export function Surface() {
  const [group, setGroup] = useState<GroupId | "all">("all");
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Perth",
        hour: "numeric",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
      const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
      const phase = hour >= 6 && hour < 18 ? "DAY" : "NIGHT";
      setClock(`${String(hour).padStart(2, "0")}:${minute} AWST / ${phase}`);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="sky min-h-screen">
      <a
        href="#practice"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the practice
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            CDXI
          </a>
          <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto" aria-label="Planet">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex h-11 shrink-0 items-center px-2 text-sm text-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:enquiries@cdxi.au"
            className="hidden h-11 items-center text-sm text-fg sm:inline-flex"
          >
            enquiries@cdxi.au
          </a>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,26rem)] lg:px-8 lg:py-20">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted">
              PLANET / ACTIVE / PERTH{clock ? ` / ${clock}` : ""}
            </p>
            <h1 className="mt-4 text-balance text-6xl font-semibold tracking-tight md:text-8xl">CDXI</h1>
            <p className="mt-5 max-w-xl text-pretty text-xl leading-snug text-fg md:text-2xl">
              Big ideas. Bespoke solutions. No unnecessary complexity.
            </p>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              An independent Australian consultancy turning ideas, challenges and opportunities into practical,
              beautifully executed work. Business, brand, digital, technology and AI — with the person doing the work.
            </p>
            <p className="mt-6 font-medium text-accent">Your vision. Our expertise. Built for you.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-5 font-medium text-ink"
              >
                See services
              </a>
              <a
                href="#begin"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-line px-5"
              >
                Start a conversation
              </a>
            </div>
          </div>
          <Planet />
        </section>

        <section id="practice" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <SectionIndex index="01" label="The practice" />
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              We don’t believe in one-size-fits-all. We believe in finding what fits you.
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
              <div className="space-y-4 text-pretty leading-relaxed text-muted">
                <p>
                  Based in Perth, Western Australia, CDXI brings together business strategy, creative design, digital
                  development, technology and artificial intelligence under one roof — without the overheads, inflated
                  fees or unnecessary complexity of a traditional agency.
                </p>
                <p>
                  Rather than layers of account managers, you work directly with the consultant responsible for
                  understanding the requirement and delivering the project. Led by Jamison Parker, Brand Principal, that
                  means clearer communication, greater flexibility and solutions designed around what the business
                  actually needs.
                </p>
                <p>
                  Some clients arrive with a detailed brief. Others arrive with an idea, a problem or a question. Both
                  are welcome. The work does not stop at how something looks. It has to function, deliver value, and be
                  able to evolve with the business it supports.
                </p>
              </div>
              <dl className="grid content-start gap-4 border-t border-line pt-4 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div>
                  <dt className="font-mono text-xs tracking-widest text-muted">PRINCIPAL</dt>
                  <dd className="mt-1">Jamison Parker, Brand Principal</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-widest text-muted">WHERE</dt>
                  <dd className="mt-1">Perth, Western Australia</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-widest text-muted">DIRECT</dt>
                  <dd className="mt-1">
                    <a className="underline decoration-line underline-offset-4" href="mailto:parker@cdxi.au">
                      parker@cdxi.au
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-widest text-muted">ENQUIRIES</dt>
                  <dd className="mt-1">
                    <a className="underline decoration-line underline-offset-4" href="mailto:enquiries@cdxi.au">
                      enquiries@cdxi.au
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <ol className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                ["Understand the challenge.", "Technology should simplify. Design should have purpose. Strategy should lead to action."],
                ["Challenge the conventional.", "Curiosity over convention. Collaboration over complexity. Results over impressive-sounding promises."],
                ["Create something better.", "Professional expertise and exceptional creative work should be accessible to businesses of every size."],
              ].map(([title, line], index) => (
                <li key={title} className="border-t border-line pt-4">
                  <p className="font-mono text-xs text-muted">0{index + 1}</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-balance">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{line}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <h3 className="text-lg font-semibold">What we do</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {practiceAreas.map((area) => (
                  <li key={area.group}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-1 py-4 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                      onClick={() => {
                        setGroup(area.group);
                        document.getElementById("services")?.scrollIntoView();
                      }}
                    >
                      <span className="font-medium">{area.title}</span>
                      <span className="text-sm text-muted">{area.line}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Workbench group={group} onGroup={setGroup} />

        <section id="support" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <SectionIndex index="03" label="Monthly support" />
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A retained orbit, billed in advance.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-muted">
              Unused hours do not roll over. Extra hours need approval and are charged at the agreed rate.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {retainers.map((plan) => (
                <article key={plan.id} className="flex flex-col rounded-lg border border-line bg-surface p-5">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 font-mono text-accent">{plan.priceLabel}</p>
                  <p className="mt-4 text-sm text-fg">{plan.hours} per month</p>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{plan.included}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <SectionIndex index="04" label="Custom projects" />
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">When the work doesn’t fit a line item.</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {bands.map((band) => (
                <li key={band.name} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <p className="font-medium">{band.name}</p>
                  <p className="text-sm text-pretty text-muted">{band.scope}</p>
                  <p className="font-mono text-sm text-accent">{band.guide}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="terms" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <SectionIndex index="05" label="Terms & conditions" />
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight">
              The terms that sit under a quotation.
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {terms.map((term, index) => (
                <details key={term.title} className="group py-1">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3">
                    <span>
                      <span className="mr-3 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                      {term.title}
                    </span>
                    <span className="font-mono text-xs text-muted group-open:hidden">OPEN</span>
                    <span className="hidden font-mono text-xs text-muted group-open:inline">CLOSE</span>
                  </summary>
                  <p className="max-w-3xl pb-4 text-sm leading-relaxed text-pretty text-muted">{term.body}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Inclusions and contract terms in this guide are proposed definitions for approval. Seek Australian legal
              review before formal adoption. Version 1.0 · 1 July 2026 – 30 June 2027.
            </p>
          </div>
        </section>

        <Enquiry />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted lg:px-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-fg">CDXI</p>
            <p className="mt-1">Independent business, brand and digital consultancy.</p>
          </div>
          <p>Perth · enquiries@cdxi.au · FY 2026/27</p>
        </div>
      </footer>
    </div>
  );
}

function Enquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState(
    "I'd like to talk through a project. I have an idea, a problem, or a question.",
  );
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onBrief = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail.trim()) {
        setMessage(detail);
        setReady(false);
      }
    };
    window.addEventListener("cdxi:brief", onBrief);
    return () => window.removeEventListener("cdxi:brief", onBrief);
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Add your name so the reply has somewhere to land.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Add an email address CDXI can reply to.");
      return;
    }
    if (message.trim().length < 12) {
      setError("Say a little about what you need.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`CDXI enquiry — ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}${organisation.trim() ? `\n${organisation.trim()}` : ""}`,
    );
    setReady(true);
    window.location.href = `mailto:enquiries@cdxi.au?subject=${subject}&body=${body}`;
  }

  return (
    <section id="begin" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionIndex index="06" label="Getting started" />
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Let’s build something better.
          </h2>
          <ol className="mt-6 space-y-3 text-muted">
            <li>Discuss your requirements.</li>
            <li>Receive a tailored scope and quote.</li>
            <li>Review the solution during development.</li>
            <li>Approve, launch and receive handover.</li>
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Whether you’re starting from scratch, improving what already exists, or exploring something new — a small
            task or an entire concept — the same commitment applies: quality, originality and results.
          </p>
        </div>
        <form onSubmit={submit} className="rounded-lg border border-line bg-surface p-5" noValidate>
          <div className="grid gap-4">
            <Field label="Name" value={name} onChange={setName} autoComplete="name" />
            <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
            <Field label="Organisation" value={organisation} onChange={setOrganisation} autoComplete="organization" optional />
            <label className="grid gap-2 text-sm">
              <span>What you need</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                className="rounded-lg border border-line bg-bg px-3 py-3 text-fg"
              />
            </label>
          </div>
          {error && (
            <p className="mt-3 text-sm text-accent" role="alert">
              {error}
            </p>
          )}
          {ready && !error && (
            <p className="mt-3 text-sm text-muted">
              Your email app should open to enquiries@cdxi.au. If it doesn’t, write directly — or to parker@cdxi.au.
            </p>
          )}
          <button type="submit" className="mt-5 h-12 w-full rounded-lg bg-accent font-medium text-ink">
            Email enquiries@cdxi.au
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>
        {label}
        {optional ? <span className="text-muted"> · optional</span> : null}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-lg border border-line bg-bg px-3 text-fg"
      />
    </label>
  );
}
