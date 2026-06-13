# 08 — Observability

Milestone 10. You should be able to **see what the platform is doing**: logs,
at least one metric, and an alarm — and make the Status page reflect reality.

## Logs → CloudWatch

- **EKS pods:** install **CloudWatch Container Insights** (or Fluent Bit) so pod
  stdout/stderr ships to CloudWatch Logs. The app already logs each request
  (`[api] GET /api/...`) and errors to stdout.
- **Lambdas:** logs go to CloudWatch automatically (the execution role includes
  `AWSLambdaBasicExecutionRole`).

Check them:
```bash
aws logs tail /aws/lambda/<project>-dev-visitor-counter --follow
kubectl logs deploy/backend -n cloud-portfolio-dev
```

## Metrics

Pick a few that matter and know where they come from:

| Metric | Source |
|---|---|
| ALB request count / 5xx | ALB CloudWatch metrics |
| Target response time | ALB target group |
| RDS CPU / connections / free storage | RDS metrics |
| Lambda errors / duration / throttles | Lambda metrics |
| Pod CPU / memory | Container Insights |

## Alarms

Create at least one **useful** alarm — something you'd actually want to be paged
on. Good candidates:

- ALB 5xx rate > 0 for 5 minutes
- RDS free storage below a threshold
- Lambda error count > 0
- Unhealthy target count > 0

Wire the alarm action to an SNS topic you subscribe to (email).

## Make the Status page real

`backend/src/routes/status.js` currently reports the API and DB. Extend it
(there are `TODO`s in the file) to reflect real signals, for example:

- the visitor-counter Lambda (call it, or read a CloudWatch metric)
- RDS reachability/latency (already partly there)
- overall "operational / degraded" derived from the above

Keep it **cheap and read-only** — the public site polls it.

## What "done" looks like

- [ ] You can tail app + Lambda logs in CloudWatch.
- [ ] At least one dashboard or saved metric view.
- [ ] At least one alarm that notifies you.
- [ ] The Status page shows more than just "API + DB" and reacts to real state.
