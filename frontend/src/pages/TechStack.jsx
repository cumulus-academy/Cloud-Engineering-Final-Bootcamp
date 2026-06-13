import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stack = [
  {
    group: "Frontend",
    tech: ["React", "Vite", "Tailwind CSS", "shadcn/ui", "nginx"],
  },
  {
    group: "Backend",
    tech: ["Node.js", "Express", "PostgreSQL (pg)"],
  },
  {
    group: "Serverless",
    tech: ["AWS Lambda", "DynamoDB", "API Gateway"],
  },
  {
    group: "Infrastructure",
    tech: ["Terraform", "Amazon EKS", "Kubernetes", "Amazon RDS", "Application Load Balancer"],
  },
  {
    group: "Networking & Security",
    tech: ["Route53", "ACM", "VPC", "IAM", "Secrets Manager"],
  },
  {
    group: "CI/CD & Operations",
    tech: ["GitHub Actions", "Amazon ECR", "OIDC", "CloudWatch"],
  },
];

export default function TechStack() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Technology Stack"
        description="The full set of technologies used to build, ship and run this platform."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((s) => (
            <Card key={s.group}>
              <CardHeader>
                <CardTitle>{s.group}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
