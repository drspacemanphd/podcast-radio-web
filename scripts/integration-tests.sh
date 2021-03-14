#!/bin/bash
set -e

changed=$(node ./scripts/get-changed-packages.js)
echo $changed

IFS=$'\n'
readarray -t packages <<<"$changed" #reading str as an array as tokens separated by IFS  
echo ''
echo $packages
for i in "${packages[@]}"; do   # access each element of array
  package=${i:15}
  echo $package
  # (cd ./packages/$package && npm run test:integration)
done
