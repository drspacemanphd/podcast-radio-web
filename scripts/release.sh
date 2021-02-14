#!/bin/sh
set -e

if [ -z "$BUMP" ]; then
  echo MUST PROVIDE VALID LERNA BUMP FOR VERSIONING
  return 1
else
  npm run clean
  yarn --frozen-lockfile
  lerna version "$BUMP"
  lerna run build
  lerna publish --from-git --contents ./dist --yes
  return 0
fi