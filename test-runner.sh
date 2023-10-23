export DEFAULT_PAYMENT_METHOD="DEPOSITO"
export ONLINE_PROCESSING_TYPE="COL"
export OFFLINE_PROCESSING_TYPE="COF"
export CONFIG_CONCEPTO_HOST="api.dev.tegere.info"
export CONFIG_CONCEPTO_TOKEN_HOST="id.dev.tegere.info"
export CONFIG_CONCEPTO_SCOPE="tgr-dev-api-configurador-conceptos/all"
node --test --watch __tests__
# node --test --test-only --watch __tests__
# node --test