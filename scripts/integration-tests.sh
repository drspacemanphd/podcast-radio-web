#!/bin/bash
set -e

changed=$(set CI=false lerna changed)
echo $changed

IFS=$'\n'
readarray -t packages <<<"$changed" #reading str as an array as tokens separated by IFS  
  
for i in "${packages[@]}"; do   # access each element of array
  package=${i:15}
  (cd ./packages/$package && npm run test:integration)
done
