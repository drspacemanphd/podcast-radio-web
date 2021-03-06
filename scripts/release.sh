#!/bin/sh
set -e

npm run clean
yarn --frozen-lockfile
lerna version --conventional-commits
lerna run build
lerna publish from-git
return 0