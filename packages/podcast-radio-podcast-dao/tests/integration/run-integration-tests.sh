#!/bin/bash
docker-compose -f docker-compose.integration.yml down --remove-orphans && docker-compose -f docker-compose.integration.yml up -d --build
sleep 5
(cd ../../infrastructure/integration-tests/podcast-radio-podcast-dao && terraform init)
(cd ../../infrastructure/integration-tests/podcast-radio-podcast-dao && terraform apply -auto-approve)
jest --globalSetup ./tests/integration/setup.js --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000