#!/bin/bash
set -e

git fetch origin master

echo "current branch"
echo $(git branch)
echo "current sha"
echo $(git rev-parse HEAD)
echo "log"
echo $(git log)
commit=$(git rev-parse HEAD)

git pull origin master

changed=$(node ./scripts/get-changed-packages.js)

IFS=';' read -ra packages <<< "$changed"

if [ ${#packages[@]} = 0 ]; then
  echo "No packages changed"
  exit 0
fi

echo "The Following Packaged Will Be Tested"
echo ${packages[@]}

for (( i=0; i<${#packages[@]}; i++ )); do   # access each element of array
  if [ "${packages[$i]}" != '' ]; then
    package=${packages[i]:15}
    (cd ./packages/$package && npm run test:integration)
  fi
done
