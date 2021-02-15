#!/bin/sh
set -e

docker-compose -f docker-compose.local.yml up -d --build
sleep 5
(cd ../../infrastructure/local/podcast-radio-rss-poller && terraform init)
(cd ../../infrastructure/local/podcast-radio-rss-poller && terraform apply -auto-approve)
nodemon ./local/invoke.ts ./local/event.json