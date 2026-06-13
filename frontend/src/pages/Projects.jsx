import { Github, ExternalLink, Star } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loading, ErrorState } from "@/components/States";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

export default function Projects() {
  const { data, loading, error } = useFetch(() => api.projects());

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        description="Things I’ve built — infrastructure, pipelines and platforms."
      />
      <Section>
        {loading && <Loading />}
        {error && <ErrorState error={error} />}
        {data && (
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((p) => (
              <Card key={p.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {p.featured && <Star className="h-4 w-4 fill-primary text-primary" />}
                    <CardTitle>{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="muted">{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-4 pt-5 text-sm">
                    {p.repo_url && (
                      <a
                        href={p.repo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                    )}
                    {p.demo_url && (
                      <a
                        href={p.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
