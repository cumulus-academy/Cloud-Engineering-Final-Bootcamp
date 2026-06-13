# kubernetes/

Kubernetes manifests for deploying the app to **EKS**, managed with **Kustomize**.
The structure is provided; the manifests are **partially complete** — you finish
the `TODO`s (Milestone 5 + 7).

```
kubernetes/
├── base/                       # the app, environment-agnostic
│   ├── frontend-deployment.yaml   🟨 image/resources TODO
│   ├── frontend-service.yaml      ✅
│   ├── backend-deployment.yaml    🟨 image/secret/resources TODO
│   ├── backend-service.yaml       ✅
│   ├── ingress.yaml               🟨 ALB cert + host TODO
│   └── kustomization.yaml         ✅ wiring given
└── overlays/
    └── dev/
        ├── namespace.yaml         ✅
        └── kustomization.yaml     🟨 image URLs + patches TODO
```

## Render it (works out of the box)

```bash
kubectl kustomize kubernetes/overlays/dev
```

This succeeds on a fresh clone — it just still has placeholder images and no
TLS. You make it real by completing the TODOs.

## What's done vs. your job

**Done:** Services, the Kustomize wiring, the namespace, sensible probes
(`/healthz` for frontend, `/api/health` for backend — the latter is DB-free so
pods stay healthy before RDS exists), and the routing in the Ingress.

**Your job:**

- [ ] **Images (M4/M5):** set your ECR repo URLs in the overlay `images:` block.
- [ ] **DB secret (M3/M9):** create a `backend-secrets` Secret with `DATABASE_URL`
      from **Secrets Manager**, then uncomment the `secretKeyRef` in
      `backend-deployment.yaml`. See below.
- [ ] **Resources (M5):** add requests/limits to both deployments.
- [ ] **Ingress (M7):** install the AWS Load Balancer Controller, set the ACM
      `certificate-arn`, add your domain `host`, and enable `ssl-redirect`.
- [ ] **Patches (M5):** tune replicas; optionally add an HPA.

## Deploy

```bash
# 1. Connect kubectl to your cluster (after the eks module is applied):
aws eks update-kubeconfig --name <cluster_name> --region <aws_region>

# 2. Apply the dev overlay:
kubectl apply -k kubernetes/overlays/dev

# 3. Watch it come up:
kubectl get pods -n cloud-portfolio-dev
kubectl get ingress -n cloud-portfolio-dev   # shows the ALB address
```

## Creating the backend DB secret

The backend reads `DATABASE_URL` from a Secret. The simplest path for this
project (you can automate it later with the External Secrets Operator):

```bash
# Read the connection details from the Secrets Manager secret RDS created
# (terraform output db_secret_arn), build a DATABASE_URL, then:
kubectl create secret generic backend-secrets \
  --namespace cloud-portfolio-dev \
  --from-literal=DATABASE_URL="postgresql://USER:PASS@HOST:5432/portfolio"
```

> Never commit real credentials. This Secret is created out-of-band, not stored
> in git. For bonus marks, sync it automatically from Secrets Manager.

See [docs/05-kubernetes-guide.md](../docs/05-kubernetes-guide.md).
