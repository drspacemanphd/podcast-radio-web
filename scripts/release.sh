#!/bin/sh
set -e

if [ -z "$BUMP" ]; then
  echo MUST PROVIDE VALID LERNA BUMP FOR VERSIONING
  return 1
else
  npm run clean
  yarn --frozen-lockfile
  lerna version "$BUMP"
  lerna publish from-git --yes --contents dist
  return 0
fi