# Architecture diagram (reference)

The canonical reference diagram for this project, as a **mermaid** graph (GitHub
renders it below). This is documentation — for the diagram shown on the **live
site**, see [frontend/public/diagrams/](../../frontend/public/diagrams/) (your
draw.io diagram).

```mermaid
flowchart TB
  user([Visitor / Recruiter])

  user --> r53["Route53<br/>(your domain)"]
  r53 --> acm["ACM<br/>TLS cert"]
  acm --> alb["Application<br/>Load Balancer"]

  subgraph eks["EKS Cluster"]
    fe["frontend pod<br/>React + nginx"]
    be["backend pod<br/>Node + Express"]
  end

  alb -->|"/"| fe
  alb -->|"/api"| be

  be --> rds[("RDS<br/>PostgreSQL")]
  be -. "reads creds" .-> sm["Secrets<br/>Manager"]

  fe -. "/api/visits, /api/contact" .-> apigw["API Gateway"]
  apigw --> vc["Lambda<br/>visitor-counter"]
  apigw --> cf["Lambda<br/>contact-form"]
  vc --> ddb[("DynamoDB")]

  gha["GitHub Actions<br/>(OIDC)"] --> ecr[("ECR")]
  ecr --> eks
  tf["Terraform"] --> awsinfra["All AWS infrastructure"]

  be --> cw["CloudWatch"]
  eks --> cw
  vc --> cw
```

## Legend

- **Solid arrows** — request / data flow.
- **Dotted arrows** — credential reads and async calls.
- **Cylinders** — data stores (RDS, DynamoDB, ECR).

## Keeping it current

If you change the architecture (e.g. add a cache or a queue), update this
diagram **and** your draw.io diagram on the site so they match what you actually
deployed. Reviewers compare the diagram against your real infrastructure.
