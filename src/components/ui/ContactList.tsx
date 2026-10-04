import { channels } from "@/lib/contact";

/**
 * Lists contact channels from site config. A channel renders as a link only
 * once its value is configured; until then its placeholder is plain text.
 */
export function ContactList({ className = "" }: { className?: string }) {
  return (
    <dl className={`border-t border-line ${className}`}>
      {channels.map((channel) => (
        <div key={channel.kind} className="grid grid-cols-[7rem_1fr] items-baseline border-b border-line py-4">
          <dt className="label text-muted">{channel.label}</dt>
          <dd className="text-small text-ink">
            {channel.href ? (
              <a href={channel.href} className="link-line">
                {channel.value}
              </a>
            ) : (
              channel.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
