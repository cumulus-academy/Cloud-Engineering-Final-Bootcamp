# 09 — Troubleshooting

Start here when something breaks. If you're still stuck after these, ask an
instructor — and include the exact error.

## 💸 First: stop the bleeding (cost)

If you're not actively working, tear down the expensive stuff:

```bash
cd terraform/environments/dev
terraform destroy
```

EKS, RDS, NAT gateways and the ALB bill by the hour. You can always re-apply.

## Local

**`make dev` fails / containers won't start**
- Is Docker running? `docker compose version`
- Did you run `make customize` first? `make dev` does it for you if `.env` is
  missing, but check `.env` exists.
- Port clash on 3000/4000/5432? Change the port in `.env`.

**Site loads but Skills/Projects are empty / Status shows DB down**
- The database may not have seeded. `make clean && make customize && make dev`
  recreates the volume and re-runs schema + seed.
- Check backend logs: `make logs` (look for `[api]` errors).

**`make customize` warns about default values**
- You haven't edited `customization.json` yet — that's the warning's point.

## Terraform

**`terraform validate` fails on a fresh clone**
- It shouldn't — module calls start commented out. Did you uncomment a `module`
  block before completing the module's `outputs.tf`? Re-comment or finish it.

**`Error: Backend configuration changed`**
- You edited `backend.tf`. Run `terraform init -migrate-state`.

**`destroy` hangs or errors on dependencies**
- Order matters: delete Kubernetes resources that created AWS objects first
  (`kubectl delete -k kubernetes/overlays/dev`) — especially the Ingress/ALB —
  then `terraform destroy`. A dangling ALB or ENI blocks VPC deletion.

## Kubernetes

**Pods stuck `ImagePullBackOff`**
- The overlay `images:` URLs are still placeholders, or the image/tag isn't in
  ECR, or the node role lacks `AmazonEC2ContainerRegistryReadOnly`.

**Pods `CrashLoopBackOff` (backend)**
- The liveness probe is DB-free, so a crash is usually a bad `DATABASE_URL` or
  missing `backend-secrets`. `kubectl logs` the pod.

**`kubectl` can't connect**
- Re-run `aws eks update-kubeconfig --name <cluster> --region <region>`.

**Ingress has no address**
- The AWS Load Balancer Controller isn't installed/working, or subnets aren't
  tagged for ELB discovery (see the network module). Check the controller's logs.

## CI/CD

**AWS workflow fails at "Configure AWS credentials"**
- `AWS_ROLE_ARN` variable not set, or the role's trust policy doesn't allow your
  repo, or the workflow is missing `permissions: id-token: write`.

**`ci.yml` red**
- Run the same commands locally: `cd backend && npm install && npm test`, and
  `cd frontend && npm install && npm run build`.

## DNS / TLS

**Certificate stuck "Pending validation"**
- The DNS validation records aren't in the right hosted zone, or (for a new zone)
  your registrar's nameservers don't point at it yet. DNS can take a while.

**HTTPS doesn't work but HTTP does**
- The Ingress is missing the `certificate-arn` annotation or the cert is in a
  different region than the ALB. ACM for an ALB must be in the ALB's region.
