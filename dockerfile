FROM ghcr.io/zerocluster/node/app

RUN \
    # install deps
    npm i --omit=dev \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
