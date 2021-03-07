#!/bin/sh
set -e

# Install all dependencies for build
cp ../../yarn.lock ./yarn.lock
yarn install --frozen-lockfile

# Build
npm run build

# Remove dev dependencies such that only required dependencies are packaged
rm -rf node_modules
yarn install --frozen-lockfile --production
rm yarn.lock

# Build the lambda function
(cd ./dist && zip -r9q ../lambda.zip  ./* ../node_modules)