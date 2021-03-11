#!/bin/sh
set -e

docker-compose -f docker-compose.local.yml up -d --build
sleep 5
(cd ../../infrastructure/integration-tests/podcast-radio-podcast-service && terraform init)
(cd ../../infrastructure/integration-tests/podcast-radio-podcast-service && terraform apply -auto-approve)
nodemon ./index.ts