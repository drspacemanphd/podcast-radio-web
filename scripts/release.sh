#!/bin/sh
set -e

npm run clean
yarn --frozen-lockfile
lerna version --conventional-commits
lerna run build
lerna publish from-git --contents ./dist
lerna version patch
return 0