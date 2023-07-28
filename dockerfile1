FROM ghcr.io/zerocluster/node

RUN \
    # install deps
    npm i --omit=dev \
    \
    # build frontend
    && pushd frontend \
    && NODE_ENV= npm i \
    && npm run build \
    && mv www /tmp && rm -rf * && mv /tmp/www . \
    && popd \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
