docker-compose -f docker-compose.local.yml down && docker-compose -f docker-compose.local.yml up
sleep 5
(cd ./infrastructure/podcast-radio-rss-poller/local && terraform init)
(cd ./infrastructure/podcast-radio-rss-poller/local && terraform apply -auto-approve)