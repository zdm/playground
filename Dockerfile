FROM ghcr.io/zerocluster/node/app

RUN \
    # install dependencies
    NODE_ENV=production npm install-clean \
    \
    # build frontend
    && pushd frontend \
    && NODE_ENV=development npm install-clean \
    && npm run build \
    && mv www /tmp && rm -rf * && mv /tmp/www . \
    && popd \
    \
    # cleanup
    && /usr/bin/env bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
