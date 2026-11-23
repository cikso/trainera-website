"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["How it works", "how-it-works"],
  ["AI customers", "customers"],
  ["Hire", "hire"],
  ["Onboard", "onboard"],
  ["Train", "train"],
  ["Coach", "coach"],
  ["FAQ", "faq"],
] as const;

/**
 * The landing page's sticky header — the page's only client component. Under 1120px the
 * section links collapse into a menu that closes on a link tap or Escape.
 *
 * `loginUrl` is the app's full address (app.trainera.ai/login), a different website; it stays a plain <a>.
 */
/** The brand line under the logo, as in the email signature: "Era" picks up the logo's orange. */
export function BrandLine() {
  return (
    <span className="tp-brandline" aria-hidden="true">
      A New <span className="tp-brandline-era">Era</span> In Training
    </span>
  );
}

export function LandingNav({ loginUrl, demoUrl }: { loginUrl: string; demoUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="tp-nav">
      <div className="tp-wrap tp-nav-row">
        <a className="tp-logo" href="#s-hero" aria-label="Trainera home">
          <Image src="/brand/trainera-logo.png" width={1147} height={320} alt="Trainera" priority />
          <BrandLine />
        </a>
        <nav id="tp-nav-links" aria-label="Main" className={open ? "tp-nav-links is-open" : "tp-nav-links"}>
          {LINKS.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          {/* Collapsed menu only: phones hide the header's Log in, so the menu must carry it. */}
          <a className="tp-nav-menu-login" href={loginUrl}>
            Log in
          </a>
        </nav>
        <div className="tp-nav-actions">
          <a className="tp-nav-login" href={loginUrl}>
            Log in
          </a>
          <a className="tp-btn tp-btn-sm" href={demoUrl}>
            Book a demo
          </a>
          <button
            type="button"
            className="tp-nav-toggle"
            aria-expanded={open}
            aria-controls="tp-nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
