import { useState } from "react";
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loading, ErrorState } from "@/components/States";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

const statusStyle = {
  operational: { icon: CheckCircle2, color: "text-success", badge: "success" },
  degraded: { icon: AlertTriangle, color: "text-primary", badge: "default" },
  down: { icon: XCircle, color: "text-destructive", badge: "muted" },
};

export default function Status() {
  // `nonce` lets the Refresh button re-trigger the fetch.
  const [nonce, setNonce] = useState(0);
  const { data, loading, error } = useFetch(() => api.status(), [nonce]);

  const overall = data?.overall || "operational";
  const Overall = statusStyle[overall] || statusStyle.operational;

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Platform Status"
        description="Live health of the platform components, read from the API."
      />
      <Section className="space-y-6">
        <div className="flex items-center justify-between">
          {data && (
            <div className="flex items-center gap-2">
              <Overall.icon className={`h-5 w-5 ${Overall.color}`} />
              <span className="font-medium">
                {overall === "operational" ? "All systems operational" : `System ${overall}`}
              </span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={() => setNonce((n) => n + 1)}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        {loading && <Loading label="Checking components…" />}
        {error && <ErrorState error={error} />}

        {data && (
          <div className="space-y-3">
            {data.components.map((c) => {
              const s = statusStyle[c.status] || statusStyle.down;
              return (
                <Card key={c.name}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-muted-foreground">{c.detail}</p>
                      </div>
                    </div>
                    <Badge variant={s.badge}>{c.status}</Badge>
                  </CardContent>
                </Card>
              );
            })}
            <p className="text-xs text-muted-foreground">
              Last checked: {new Date(data.checkedAt).toLocaleTimeString()}
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
