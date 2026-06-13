import { Award, ExternalLink } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loading, ErrorState } from "@/components/States";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

const statusVariant = {
  earned: "success",
  "in-progress": "default",
  planned: "muted",
};

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export default function Certifications() {
  const { data, loading, error } = useFetch(() => api.certifications());

  return (
    <>
      <PageHeader
        eyebrow="Certifications"
        title="Certifications"
        description="Cloud certifications earned, in progress, and planned."
      />
      <Section>
        {loading && <Loading />}
        {error && <ErrorState error={error} />}
        {data && (
          <div className="grid gap-4 md:grid-cols-2">
            {data.certifications.map((c) => (
              <Card key={c.id}>
                <CardHeader className="flex-row items-start justify-between space-y-0">
                  <div className="flex items-start gap-3">
                    <Award className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-base">{c.name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[c.status] || "muted"}>{c.status}</Badge>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatDate(c.issued_date) || "—"}</span>
                  {c.credential_url && (
                    <a
                      href={c.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
