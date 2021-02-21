#!/bin/bash
set -e

(cd ./infrastructure/integration-tests/podcast-radio-podcast-dao && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-podcast-dao && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000