/**
 * CSIA's branding on the public CSIA share pages (trainera.ai/CCCE and
 * trainera.ai/CSIAvideo). Brett asked (Nov 2026) for these pages to carry
 * CSIA's own look and for "Book a demo" to email CSIA, not Trainera.
 *
 * The button is CSIA purple (#703e8e, the workspace's brand colour) with
 * white text: 7.4:1, AA at any size. It opens an email to info@csia.com.au
 * with the subject filled in; there is no form and nothing is stored.
 * Copy follows the public-site rules: no dashes.
 */
export const CSIA_EMAIL = "info@csia.com.au";
const CSIA_PURPLE = "#703e8e";

export function csiaMailto(subject: string) {
  return `mailto:${CSIA_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function CsiaLogo({ className = "" }: { className?: string }) {
  // The CSIA logo for light backgrounds (dark lettering, the ring in colour).
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/csia/csia-logo.png" alt="CSIA" width={753} height={401} className={`h-12 w-auto ${className}`} />
  );
}

export function CsiaDemoButton({ subject }: { subject: string }) {
  return (
    <a
      href={csiaMailto(subject)}
      className="inline-flex h-11 items-center rounded-md px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
      style={{ backgroundColor: CSIA_PURPLE }}
    >
      Book a demo
    </a>
  );
}
