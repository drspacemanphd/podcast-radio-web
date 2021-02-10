#!/bin/bash
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000