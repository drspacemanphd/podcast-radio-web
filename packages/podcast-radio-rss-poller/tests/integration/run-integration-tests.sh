#!/bin/sh
set -e

apk add zip
npm run build
(cd ./dist && zip -r9 ../lambda.zip  ./* ../node_modules ../.env.integration)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && rm -rf .terraform)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && rm -rf terraform*)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000