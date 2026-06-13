import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DiagramViewer } from "@/components/DiagramViewer";

const layers = [
  {
    title: "Edge & Networking",
    items: ["Route53 (DNS)", "ACM (TLS certificate)", "Application Load Balancer", "VPC, subnets & security groups"],
  },
  {
    title: "Compute (EKS)",
    items: ["Frontend pod (React, served by nginx)", "Backend pod (Node + Express API)", "Kubernetes Ingress → ALB"],
  },
  {
    title: "Data & Services",
    items: ["RDS PostgreSQL (profile, skills, certs, projects)", "DynamoDB (visitor counter)", "Lambda: visitor-counter", "Lambda: contact-form", "Secrets Manager (DB credentials)"],
  },
  {
    title: "Delivery & Operations",
    items: ["ECR (container images)", "GitHub Actions (CI/CD via OIDC)", "Terraform (all infrastructure)", "CloudWatch (logs, metrics, alarms)"],
  },
];

const diagram = `                        Route53  (your domain)
                             │
                          ACM / TLS
                             │
                    Application Load Balancer
                             │
            ┌────────────── EKS ──────────────┐
            │   frontend pod     backend pod  │
            └──────────────────────┬──────────┘
                                   │
        ┌──────────────┬───────────┴───────┬───────────────┐
   RDS Postgres   Secrets Manager     Lambda+DynamoDB    CloudWatch
                                      (visitor counter)
`;

export default function Architecture() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Architecture"
        description="How this platform is built and runs on AWS."
      />
      <Section className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>High-level diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <DiagramViewer
              fallback={
                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                  {diagram}
                </pre>
              }
            />
            <p className="mt-3 text-sm text-muted-foreground">
              This diagram loads from{" "}
              <Badge variant="muted">public/diagrams/architecture.drawio.svg</Badge>.
              Build your own in draw.io and replace that file — see its README.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {layers.map((l) => (
            <Card key={l.title}>
              <CardHeader>
                <CardTitle>{l.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {l.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-primary">▸</span> {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
