FROM ghcr.io/zerocluster/node/app

RUN \
    --mount=type=secret,id=NPM_TOKEN_GITHUB,env=NPM_TOKEN_GITHUB \
    \
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
    && script=$(curl -fsSL "https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh") \
    && bash <(echo "$script") cleanup
