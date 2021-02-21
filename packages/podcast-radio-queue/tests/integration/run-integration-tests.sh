#!/bin/bash
set -e

(cd ./infrastructure/integration-tests/podcast-radio-queue && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-queue && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000