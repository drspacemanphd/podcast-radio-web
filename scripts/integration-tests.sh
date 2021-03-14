#!/bin/bash
set -e

changed=$(node ./scripts/get-changed-packages.js)

IFS=';' read -ra packages <<< "$changed"

if [ ${#packages[@]} = 0 ]; then
  echo "No packages changed"
  exit 0
fi

for (( i=0; i<${#packages[@]}; i++ )); do   # access each element of array
  if [ "${packages[$i]}" != '' ]; then
    package=${packages[i]:15}
    (cd ./packages/$package && npm run test:integration)
  fi
done
