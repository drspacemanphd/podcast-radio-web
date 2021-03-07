#!/bin/sh
set -e

npm run clean
yarn --frozen-lockfile
lerna version --conventional-commits --yes
lerna run build
lerna publish from-git --contents ./dist --yes
return 0