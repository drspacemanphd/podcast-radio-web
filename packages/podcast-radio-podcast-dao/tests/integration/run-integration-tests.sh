#!/bin/bash
(cd ./infrastructure/podcast-radio-podcast-dao && terraform init)
(cd ./infrastructure/podcast-radio-podcast-dao && terraform apply -auto-approve)
jest --testMatch=**/integration/**/*.test.ts --runInBand --detectOpenHandles --verbose --testTimeout=60000