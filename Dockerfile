FROM ghcr.io/zerocluster/node/app

RUN \
    # install deps
    NODE_ENV=production npm i \
    \
    # build frontend
    && pushd frontend \
    && NODE_ENV=development npm i \
    && npm run build \
    && mv www /tmp && rm -rf * && mv /tmp/www . \
    && popd \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
