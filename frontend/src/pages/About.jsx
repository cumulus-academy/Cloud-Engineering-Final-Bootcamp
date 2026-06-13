import { MapPin, Mail } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";
import { Loading, ErrorState } from "@/components/States";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";
import { site } from "@/data/site";

export default function About() {
  const { data: profile, loading, error } = useFetch(() => api.profile());

  return (
    <>
      <PageHeader eyebrow="About" title="About Me" description="A bit about who I am and what I do." />
      <Section>
        {loading && <Loading />}
        {error && <ErrorState error={error} />}
        {profile && (
          <div className="max-w-2xl space-y-6">
            <p className="text-lg leading-relaxed">{profile.bio}</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {profile.location || site.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a className="hover:text-primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </span>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
