#!/bin/sh
set -e

npm run clean
yarn --frozen-lockfile
lerna version --conventional-commits --exact
lerna run build
lerna publish from-git --contents ./dist
return 0