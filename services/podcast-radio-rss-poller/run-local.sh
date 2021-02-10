sleep 5
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform init)
(cd ./infrastructure/integration-tests/podcast-radio-rss-poller && terraform apply -auto-approve)
node ./local-development/index.js