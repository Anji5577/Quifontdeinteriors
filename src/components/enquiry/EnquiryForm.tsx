"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Photo } from "@/components/media/Photo";
import { finishes } from "@/content/finishes";
import { site } from "@/content/site";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import {
  buildBrief,
  emptyEnquiry,
  options,
  prefillFromUrl,
  steps,
  validate,
  type Enquiry,
  type Errors,
} from "@/lib/enquiry";
import { useHydrated } from "@/lib/use-hydrated";

const DRAFT_KEY = "enquiry-draft";

/**
 * A five-step brief. Each step is a <fieldset>; errors are summarised and
 * linked to their fields; the draft survives reloads within the session.
 * Sending opens WhatsApp or email with the brief already written.
 */
export function EnquiryForm() {
  // The draft and URL prefill only exist in the browser, so the interactive
  // form mounts after hydration (the prerendered HTML shows the same first step).
  const hydrated = useHydrated();
  return hydrated ? <Form key="client" initial={loadInitial()} /> : <Form key="server" initial={emptyEnquiry} />;
}

function loadInitial(): Enquiry {
  let base = emptyEnquiry;
  try {
    const saved = sessionStorage.getItem(DRAFT_KEY);
    if (saved) base = { ...emptyEnquiry, ...JSON.parse(saved) };
  } catch {}
  return prefillFromUrl(window.location.search, base);
}

function Form({ initial }: { initial: Enquiry }) {
  const uid = useId();
  const [data, setData] = useState<Enquiry>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const legendRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // Save the draft once the visitor has changed something (never the untouched initial state).
  useEffect(() => {
    if (data === initial) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {}
  }, [data, initial]);

  // Move focus to the new step's heading (not on first render).
  useEffect(() => {
    if (moved.current) legendRef.current?.focus();
  }, [step, done]);

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const toggle = (key: "scope" | "finishes", value: string) =>
    set(key, data[key].includes(value) ? data[key].filter((v) => v !== value) : [...data[key], value]);

  const current = steps[step]!;
  const last = step === steps.length - 1;

  const next = () => {
    const found = validate(current.key, data);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    moved.current = true;
    if (last) setDone(true);
    else setStep((s) => s + 1);
  };
  const back = () => {
    moved.current = true;
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const brief = buildBrief(data);
  const wa = whatsappLink(brief);
  const mail = mailtoLink(`Enquiry from ${data.name || "the website"}`, brief);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {}
  };

  const field = (key: keyof Enquiry) => `${uid}-${key}`;
  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Enquiry, string][];

  if (done) {
    return (
      <div className="enquiry-step">
        <h3 ref={legendRef} tabIndex={-1} className="serif text-h2 text-ink outline-none">
          Your brief is ready.
        </h3>
        <p className="mt-4 max-w-[34rem] text-body text-ink-soft">
          Send it the way that suits you. It opens with everything already written — just press send.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {wa && (
            <a href={wa} target="_blank" rel="noopener" className="label inline-flex items-center gap-3 bg-ink px-6 py-4 text-paper transition-[scale] active:scale-[0.98]">
              Send on WhatsApp <span aria-hidden="true">→</span>
            </a>
          )}
          {mail && (
            <a href={mail} className="label inline-flex items-center gap-3 border border-ink/30 px-6 py-4 text-ink transition-colors hover:border-ink">
              Send by email <span aria-hidden="true">→</span>
            </a>
          )}
          <button type="button" onClick={copy} className="label inline-flex items-center gap-3 border border-ink/30 px-6 py-4 text-ink transition-colors hover:border-ink">
            {copied ? "Copied" : "Copy brief"}
          </button>
        </div>
        {!wa && !mail && (
          <p className="mt-4 text-small text-muted">
            Direct sending switches on once the studio’s WhatsApp number or email address is added. For now, copy the brief.
          </p>
        )}

        <details className="mt-10 border-t border-line pt-5">
          <summary className="label cursor-pointer text-muted">Preview the brief</summary>
          <pre className="mt-4 overflow-x-auto bg-paper-deep p-5 font-sans text-small whitespace-pre-wrap text-ink-soft">{brief}</pre>
        </details>

        <button
          type="button"
          className="label link-line mt-8 text-muted"
          onClick={() => {
            moved.current = true;
            setDone(false);
          }}
        >
          ← Edit answers
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between gap-6">
        <p className="label text-muted">
          Step {step + 1} of {steps.length}
        </p>
        <ol className="flex flex-1 gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <li
              key={s.key}
              className={`h-px flex-1 transition-colors duration-[500ms] ${i <= step ? "bg-ink" : "bg-line"}`}
            />
          ))}
        </ol>
      </div>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-8 border-l-2 border-error bg-paper-deep px-5 py-4 outline-none">
          <p className="label text-ink">Please check:</p>
          <ul className="mt-2 space-y-1">
            {errorList.map(([key, message]) => (
              <li key={key}>
                <a href={`#${field(key)}`} className="text-small text-error underline underline-offset-4">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset key={current.key} className="enquiry-step mt-10">
        <legend className="contents">
          <h3 ref={legendRef} tabIndex={-1} className="serif text-h2 text-ink outline-none">
            {current.title}
          </h3>
        </legend>
        <p className="mt-2 text-small text-muted">{current.hint}</p>

        <div className="mt-10 space-y-10">
          {current.key === "home" && (
            <>
              <Choice id={field("propertyType")} label="Property type" value={data.propertyType} items={options.propertyType} onChange={(v) => set("propertyType", v)} error={errors.propertyType} />
              <Choice id={field("size")} label="Size" value={data.size} items={options.size} onChange={(v) => set("size", v)} error={errors.size} />
              <Choice id={field("area")} label="Carpet area (optional)" value={data.area} items={options.area} onChange={(v) => set("area", v)} />
              <Text id={field("locality")} label="Locality or area (optional)" value={data.locality} onChange={(v) => set("locality", v)} autoComplete="address-level2" />
              <Choice id={field("stage")} label="Where things stand (optional)" value={data.stage} items={options.stage} onChange={(v) => set("stage", v)} />
            </>
          )}

          {current.key === "scope" && (
            <Group id={field("scope")} label="Scope" error={errors.scope}>
              {options.scope.map((s) => (
                <Pill key={s} type="checkbox" checked={data.scope.includes(s)} onChange={() => toggle("scope", s)}>
                  {s}
                </Pill>
              ))}
            </Group>
          )}

          {current.key === "finishes" && (
            <Group id={field("finishes")} label="Finishes">
              <ul className="grid w-full grid-cols-4 gap-3 sm:grid-cols-8">
                {finishes.map((f) => {
                  const on = data.finishes.includes(f.key);
                  return (
                    <li key={f.key}>
                      <label className="group block cursor-pointer">
                        <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle("finishes", f.key)} />
                        <span className="block outline-offset-4 ring-ink transition-[box-shadow] peer-checked:ring-2 peer-focus-visible:outline peer-focus-visible:outline-1">
                          <Photo id={f.image} alt="" ratio="2 / 3" position={f.position} reveal={false} sizes="12vw" />
                        </span>
                        <span className={`label mt-2 block ${on ? "text-ink" : "text-muted"}`}>
                          {on && <span aria-hidden="true">✓ </span>}
                          {f.name}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>
          )}

          {current.key === "timing" && (
            <>
              <Choice id={field("start")} label="When would you like to start?" value={data.start} items={options.start} onChange={(v) => set("start", v)} error={errors.start} />
              {site.budgetBands.length > 0 && (
                <Choice id={field("budget")} label="Budget (optional)" value={data.budget} items={site.budgetBands} onChange={(v) => set("budget", v)} />
              )}
            </>
          )}

          {current.key === "you" && (
            <>
              <Text id={field("name")} label="Name" value={data.name} onChange={(v) => set("name", v)} autoComplete="name" error={errors.name} />
              <div className="grid gap-10 sm:grid-cols-2">
                <Text id={field("phone")} label="Phone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} autoComplete="tel" error={errors.phone} />
                <Text id={field("email")} label="Email" type="email" value={data.email} onChange={(v) => set("email", v)} autoComplete="email" error={errors.email} />
              </div>
              <Choice id={field("contactBy")} label="Best way to reach you" value={data.contactBy} items={options.contactBy} onChange={(v) => set("contactBy", v)} />
              <div>
                <label htmlFor={field("message")} className="label text-muted">
                  Anything else (optional)
                </label>
                <textarea
                  id={field("message")}
                  rows={4}
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="What isn’t working today, what you’d love the rooms to feel like…"
                  className="mt-3 block w-full resize-y border-b border-line bg-transparent py-3 text-body text-ink outline-none placeholder:text-muted/70 focus:border-ink"
                />
              </div>
            </>
          )}
        </div>
      </fieldset>

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={back} className="label link-line text-muted">
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="group label inline-flex items-center gap-3 bg-ink px-7 py-4 text-paper transition-[scale] active:scale-[0.98]"
        >
          <span className="roll" data-text={last ? "Review brief" : "Continue"}>
            <span>{last ? "Review brief" : "Continue"}</span>
          </span>
          <span aria-hidden="true" className="arrow group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </form>
  );
}

/* ---------- field primitives ---------- */

function Group({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} aria-describedby={error ? `${id}-error` : undefined}>
      <p id={`${id}-label`} className="label text-muted">
        {label}
      </p>
      <div id={id} tabIndex={-1} className="mt-4 flex flex-wrap gap-2 outline-none">
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-3 text-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Pill({
  type,
  checked,
  onChange,
  name,
  children,
}: {
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  name?: string;
  children: ReactNode;
}) {
  return (
    <label className="label cursor-pointer rounded-full border border-line px-4 py-2.5 text-ink-soft transition-colors duration-[300ms] select-none hover:border-ink hover:text-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-offset-4">
      <input type={type} name={name} className="sr-only" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

function Choice({
  id,
  label,
  value,
  items,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  items: readonly string[];
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <Group id={id} label={label} error={error}>
      {items.map((item) => (
        <Pill key={item} type="radio" name={id} checked={value === item} onChange={() => onChange(item)}>
          {item}
        </Pill>
      ))}
    </Group>
  );
}

function Text({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-3 block w-full border-b border-line bg-transparent py-3 text-body text-ink outline-none focus:border-ink aria-invalid:border-error"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}
