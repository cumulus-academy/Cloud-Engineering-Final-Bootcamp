import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Server, Activity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";
import { site } from "@/data/site";

const highlights = [
  { icon: Cloud, title: "AWS-native", text: "EKS, RDS, Lambda, DynamoDB, Route53 & ACM." },
  { icon: Server, title: "Infrastructure as Code", text: "Provisioned entirely with Terraform." },
  { icon: Activity, title: "Observable", text: "CI/CD with GitHub Actions and CloudWatch." },
];

export default function Home() {
  const { data } = useFetch(() => api.projects());
  const featured = (data?.projects || []).filter((p) => p.featured).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="container relative py-20 md:py-28">
          <Badge variant="secondary" className="mb-4">Cloud Engineer</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Hi, I’m {site.studentName}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            I build and operate reliable cloud platforms on AWS. This portfolio is itself
            deployed end-to-end on AWS using Terraform, Kubernetes and a full CI/CD pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className={cn(buttonVariants({ size: "lg" }))}>
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/architecture" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              See the Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <Card key={h.title}>
              <CardHeader>
                <h.icon className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">{h.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{h.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="container pb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <Link to="/projects" className="text-sm font-medium text-primary hover:underline">
              All projects →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="muted">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
