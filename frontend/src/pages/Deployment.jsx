import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pipeline = [
  { step: "1. Commit & push", detail: "Code pushed to GitHub triggers the CI/CD workflows." },
  { step: "2. Test & lint", detail: "GitHub Actions runs backend tests and builds the frontend." },
  { step: "3. Build images", detail: "Frontend and backend Docker images are built." },
  { step: "4. Push to ECR", detail: "Images are pushed to Amazon ECR using short-lived OIDC credentials." },
  { step: "5. Provision infra", detail: "Terraform plans and applies the AWS infrastructure." },
  { step: "6. Deploy to EKS", detail: "Kubernetes manifests roll out the new image to the cluster." },
  { step: "7. Serve traffic", detail: "ALB + Route53 + ACM serve the site over HTTPS." },
];

export default function Deployment() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Deployment Overview"
        description="How a change goes from a git push to running in production."
      />
      <Section className="space-y-6">
        <ol className="space-y-4">
          {pipeline.map((p) => (
            <li key={p.step}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{p.step}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{p.detail}</CardContent>
              </Card>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          Environment: <Badge variant="muted">dev</Badge> — see{" "}
          <Badge variant="muted">docs/06-cicd-guide.md</Badge> for the full pipeline you build.
        </p>
      </Section>
    </>
  );
}
