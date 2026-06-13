# 05 — Kubernetes Guide

You deploy the app to **EKS** using **Kustomize**. Layout and TODOs:
[kubernetes/README.md](../kubernetes/README.md).

## Connect kubectl

After the `eks` module is applied:

```bash
aws eks update-kubeconfig --name <cluster_name> --region <aws_region>
kubectl get nodes        # should list your worker nodes
```

(`<cluster_name>` is `terraform output cluster_name`.)

## Render & deploy

```bash
kubectl kustomize kubernetes/overlays/dev   # preview the rendered manifests
kubectl apply -k kubernetes/overlays/dev    # deploy
kubectl get pods -n cloud-portfolio-dev -w  # watch them start
```

## What you must complete

1. **Images** — in `overlays/dev/kustomization.yaml`, set the `images:` block to
   your ECR repo URLs (from `terraform output ecr_repository_urls`) and the tag
   your CI pushes (a git SHA).
2. **DB secret** — create the Secret the backend reads:
   ```bash
   kubectl create secret generic backend-secrets \
     --namespace cloud-portfolio-dev \
     --from-literal=DATABASE_URL="postgresql://USER:PASS@HOST:5432/portfolio"
   ```
   Get USER/PASS/HOST from the RDS Secrets Manager secret
   (`terraform output db_secret_arn`). Then uncomment the `secretKeyRef` in
   `backend-deployment.yaml`. (Bonus: automate this with the External Secrets
   Operator instead of doing it by hand.)
3. **Resources** — add requests/limits to both deployments.
4. **Ingress (Milestone 7)** — see below.

## The Ingress needs the AWS Load Balancer Controller

The `Ingress` only becomes a real ALB once the **AWS Load Balancer Controller**
is installed in the cluster. High level:

1. Create an IAM policy + IRSA role for the controller (it needs the OIDC
   provider from the `eks` module).
2. Install the controller (Helm is the common way).
3. Set the Ingress annotations: your ACM `certificate-arn`, add your domain as
   the `host` (via an overlay patch), and `ssl-redirect: "443"`.
4. `kubectl get ingress -n cloud-portfolio-dev` shows the ALB address — point
   your Route53 record at it.

## Probes (already wired)

- **frontend** → `GET /healthz` (nginx returns 200)
- **backend** → `GET /api/health` (does **not** touch the DB, so pods stay
  healthy even before RDS is connected)

## Handy debugging

```bash
kubectl describe pod <pod> -n cloud-portfolio-dev      # events, why it's not ready
kubectl logs deploy/backend -n cloud-portfolio-dev     # app logs
kubectl get ingress -n cloud-portfolio-dev             # ALB address
kubectl rollout status deploy/frontend -n cloud-portfolio-dev
```

See [09-troubleshooting.md](09-troubleshooting.md) for common pod problems.
