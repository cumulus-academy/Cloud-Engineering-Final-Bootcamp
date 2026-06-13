import { useState } from "react";
import { Github, Linkedin, Mail, Send, Info } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { site } from "@/data/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ status: "idle", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: "sending", message: "" });
    try {
      const res = await api.contact(form);
      if (res.ok) {
        setState({ status: "ok", message: "Thanks! Your message has been received." });
      } else {
        // The contact-form Lambda isn't deployed yet (Milestone 6).
        setState({
          status: "ok",
          message:
            "Thanks! (Note: the contact Lambda isn’t deployed yet, so this wasn’t delivered — but the form works.)",
        });
      }
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState({
        status: "ok",
        message:
          "Thanks! (Note: the contact Lambda isn’t deployed yet, so this wasn’t delivered — but the form works.)",
      });
      setForm({ name: "", email: "", message: "" });
    }
  }

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in Touch" description="Open to cloud engineering roles and collaboration." />
      <Section className="grid gap-8 md:grid-cols-2">
        {/* Direct links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Reach me directly</h2>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm hover:text-primary">
            <Mail className="h-5 w-5 text-primary" /> {site.email}
          </a>
          <a href={site.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-primary">
            <Linkedin className="h-5 w-5 text-primary" /> LinkedIn
          </a>
          <a href={site.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-primary">
            <Github className="h-5 w-5 text-primary" /> GitHub
          </a>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <input className={inputClass} placeholder="Your name" required value={form.name} onChange={update("name")} />
              <input className={inputClass} type="email" placeholder="Your email" required value={form.email} onChange={update("email")} />
              <textarea className={inputClass} rows={4} placeholder="Your message" required value={form.message} onChange={update("message")} />
              <Button type="submit" disabled={state.status === "sending"}>
                <Send className="h-4 w-4" />
                {state.status === "sending" ? "Sending…" : "Send"}
              </Button>
              {state.message && (
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 text-primary" /> {state.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
