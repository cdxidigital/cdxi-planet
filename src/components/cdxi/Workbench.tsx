import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Search, X } from "lucide-react";
import {
  findService,
  formatAud,
  groups,
  lineAmount,
  paymentPlan,
  projectBand,
  services,
  type GroupId,
  type Service,
} from "@/lib/cdxi/catalog";

const STORAGE_KEY = "cdxi-brief-v1";

type BriefLine = { id: string; hours: number };

export function Workbench({
  group,
  onGroup,
}: {
  group: GroupId | "all";
  onGroup: (group: GroupId | "all") => void;
}) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [lines, setLines] = useState<BriefLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as BriefLine[];
      if (Array.isArray(parsed)) {
        setLines(parsed.filter((line) => findService(line.id)));
      }
    } catch {
      /* ignore a bad local draft */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return services.filter((service) => {
      if (group !== "all" && service.group !== group) return false;
      if (!term) return true;
      return `${service.name} ${service.included} ${service.priceLabel}`.toLowerCase().includes(term);
    });
  }, [group, query]);

  const projectLines = lines
    .map((line) => ({ line, service: findService(line.id) }))
    .filter((entry): entry is { line: BriefLine; service: Service } => Boolean(entry.service));

  const monthly = projectLines.filter((entry) => entry.service.kind === "monthly");
  const project = projectLines.filter((entry) => entry.service.kind !== "monthly");
  const projectTotal = project.reduce((sum, entry) => sum + lineAmount(entry.service, entry.line.hours), 0);
  const monthlyTotal = monthly.reduce((sum, entry) => sum + entry.service.amount, 0);
  const plan = paymentPlan(projectTotal);
  const band = projectBand(projectTotal);

  function inBrief(id: string) {
    return lines.some((line) => line.id === id);
  }

  function toggle(service: Service) {
    setLines((current) =>
      current.some((line) => line.id === service.id)
        ? current.filter((line) => line.id !== service.id)
        : [...current, { id: service.id, hours: 1 }],
    );
  }

  function setHours(id: string, hours: number) {
    const next = Math.min(40, Math.max(1, hours));
    setLines((current) => current.map((line) => (line.id === id ? { ...line, hours: next } : line)));
  }

  function useBrief() {
    const text = draftText(projectLines);
    window.dispatchEvent(new CustomEvent("cdxi:brief", { detail: text }));
    document.getElementById("begin")?.scrollIntoView();
  }

  return (
    <section id="services" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="min-w-0">
          <SectionIndex index="02" label="Services & inclusions" />
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Starting prices for stated work. FY 2026/27.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-muted">
            Prices are in AUD. A starting price covers only the inclusion beside it. GST is additional only where
            applicable. Add work to a brief to see a payment shape — it is a guide, not a quotation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search services</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services"
                className="h-12 w-full rounded-lg border border-line bg-surface pr-3 pl-10 text-fg placeholder:text-muted"
              />
            </label>
          </div>
          <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
            {groups.map((item) => {
              const active = item.id === group;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onGroup(item.id)}
                  className={
                    active
                      ? "h-11 shrink-0 rounded-full bg-accent px-4 text-sm font-medium text-ink"
                      : "h-11 shrink-0 rounded-full border border-line px-4 text-sm text-fg"
                  }
                  aria-pressed={active}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 divide-y divide-line border-y border-line">
            {visible.length === 0 ? (
              <p className="py-10 text-muted">Nothing in this field matches. Try another word, or show all work.</p>
            ) : (
              visible.map((service) => {
                const open = openId === service.id;
                const selected = inBrief(service.id);
                return (
                  <article key={service.id} className="py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight">{service.name}</h3>
                        <p className="mt-1 font-mono text-sm text-accent">{service.priceLabel}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          className="h-11 rounded-lg border border-line px-3 text-sm"
                          aria-expanded={open}
                          onClick={() => setOpenId(open ? null : service.id)}
                        >
                          {open ? "Hide" : "Included"}
                        </button>
                        <button
                          type="button"
                          className={
                            selected
                              ? "h-11 rounded-lg bg-accent px-3 text-sm font-medium text-ink"
                              : "h-11 rounded-lg border border-line px-3 text-sm"
                          }
                          onClick={() => toggle(service)}
                        >
                          {selected ? "In brief" : "Add"}
                        </button>
                      </div>
                    </div>
                    {open && <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted">{service.included}</p>}
                  </article>
                );
              })
            )}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-24" aria-live="polite">
          <p className="font-mono text-xs tracking-widest text-muted">BRIEF</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">A starting shape</h3>
          {projectLines.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Add a service. Hourly work starts at one hour. Monthly work is kept separate and billed in advance.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {projectLines.map(({ line, service }) => (
                <li key={service.id} className="border-b border-line pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="mt-1 font-mono text-sm text-accent tabular-nums">
                        {service.kind === "hourly"
                          ? formatAud(lineAmount(service, line.hours))
                          : service.priceLabel}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-lg border border-line"
                      aria-label={`Remove ${service.name}`}
                      onClick={() => toggle(service)}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  {service.kind === "hourly" && (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="grid size-11 place-items-center rounded-lg border border-line"
                        aria-label={`Fewer hours of ${service.name}`}
                        onClick={() => setHours(service.id, line.hours - 1)}
                        disabled={line.hours <= 1}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-16 text-center text-sm tabular-nums">{line.hours} hr</span>
                      <button
                        type="button"
                        className="grid size-11 place-items-center rounded-lg border border-line"
                        aria-label={`More hours of ${service.name}`}
                        onClick={() => setHours(service.id, line.hours + 1)}
                        disabled={line.hours >= 40}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Project guide</dt>
              <dd className="font-mono tabular-nums">{formatAud(projectTotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Monthly</dt>
              <dd className="font-mono tabular-nums">{monthlyTotal ? `${formatAud(monthlyTotal)}/mo` : "—"}</dd>
            </div>
          </dl>

          <p className="mt-4 text-sm leading-relaxed text-muted">{plan.rule}</p>
          {plan.parts.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm">
              {plan.parts.map((part) => (
                <li key={part.name} className="flex justify-between gap-4">
                  <span>{part.name}</span>
                  <span className="font-mono tabular-nums">{formatAud(part.amount)}</span>
                </li>
              ))}
            </ul>
          )}
          {band && (
            <p className="mt-4 text-sm text-muted">
              Sits with <span className="text-fg">{band.name}</span> — {band.guide}. {band.scope}
            </p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Written quotations confirm scope and stay valid for 14 days. Extra hours need approval. This total is not a
            quote and excludes GST and third-party costs.
          </p>
          <button
            type="button"
            className="mt-5 h-12 w-full rounded-lg bg-accent font-medium text-ink disabled:opacity-40"
            disabled={projectLines.length === 0}
            onClick={useBrief}
          >
            Use this brief
          </button>
          {lines.length > 0 && (
            <button type="button" className="mt-2 h-11 w-full text-sm text-muted" onClick={() => setLines([])}>
              Clear brief
            </button>
          )}
        </aside>
      </div>
    </section>
  );
}

function draftText(
  entries: { line: BriefLine; service: Service }[],
) {
  const rows = entries.map(({ line, service }) => {
    if (service.kind === "hourly") {
      return `- ${service.name}: ${line.hours} hr at ${service.priceLabel} (${formatAud(lineAmount(service, line.hours))} guide)`;
    }
    return `- ${service.name}: ${service.priceLabel}`;
  });
  return ["I'd like to talk through this starting brief:", ...rows].join("\n");
}

export function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted">
      {index} / {label.toUpperCase()}
    </p>
  );
}
