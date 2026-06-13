# =============================================================================
# Cloud Engineer Portfolio & Operations Platform — developer shortcuts
# =============================================================================
# Run `make` or `make help` to see everything.
# You only need Docker + Node installed locally.
# =============================================================================

# Load .env if it exists so variables are available to make targets.
ifneq (,$(wildcard ./.env))
include .env
export
endif

COMPOSE := docker compose

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@echo ""
	@echo "Cloud Engineer Portfolio & Operations Platform"
	@echo "----------------------------------------------"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Typical first run:  make customize  &&  make dev"
	@echo ""

.PHONY: customize
customize: ## Apply customization.json -> renders .env and all *.template files
	@node scripts/apply-customization.mjs

.PHONY: dev
dev: ## Start the full local stack (postgres + backend + frontend) with Docker
	@test -f .env || (echo ">> No .env found. Running 'make customize' first." && $(MAKE) customize)
	$(COMPOSE) up -d --build
	@echo ""
	@echo ">> Stack starting:"
	@echo "   Frontend: http://localhost:$${FRONTEND_PORT:-3000}"
	@echo "   Backend : http://localhost:$${BACKEND_PORT:-4000}/api/health"
	@echo ""

.PHONY: down
down: ## Stop the local stack (keeps the database volume)
	$(COMPOSE) down

.PHONY: clean
clean: ## Stop the local stack AND delete the database volume
	$(COMPOSE) down -v

.PHONY: logs
logs: ## Tail logs from all running services
	$(COMPOSE) logs -f

.PHONY: seed
seed: ## Re-apply database schema + seed into the running postgres container
	@bash scripts/seed-db.sh

.PHONY: ps
ps: ## Show running containers for this project
	$(COMPOSE) ps
