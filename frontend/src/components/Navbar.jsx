import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cloud, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

const portfolioLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/certifications", label: "Certifications" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const opsLinks = [
  { to: "/architecture", label: "Architecture" },
  { to: "/status", label: "Status" },
  { to: "/tech-stack", label: "Tech Stack" },
  { to: "/deployment", label: "Deployment" },
];

function linkClass({ isActive }) {
  return cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground"
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <Cloud className="h-5 w-5 text-primary" />
          <span>{site.studentName}</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {portfolioLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <span className="h-4 w-px bg-border" />
            {opsLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Dark mode toggle (visible on all sizes) */}
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="container flex flex-col gap-3 pb-4 md:hidden">
          {[...portfolioLinks, ...opsLinks].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
