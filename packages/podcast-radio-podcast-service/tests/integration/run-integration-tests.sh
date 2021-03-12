#!/bin/sh
set -e

apk add zip
npm run build
(cd ./dist && zip -r9q ../lambda.zip  ./* ../node_modules ../.env.integration)
(cd ./infrastructure/integration-tests/podcast-radio-podcast-service && rm -rf .terraform)
(cd ./infrastructure/integration-tests/podcast-radio-podcast-service && rm -rf terraform*)
(cd ./infrastructure/integration-tests/podcast-radio-podcast-service && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-podcast-service && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000