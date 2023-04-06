openapi-generator-cli generate \
  -i "${OPENAPI_SERVER}" --generator-name typescript-axios \
  -o /local/out \
  --additional-properties=useSingleRequestParameter=true \
  --remove-operation-id-prefix

if [ "${OPENAPI_GENERATOR_UID}" ] && [ "${OPENAPI_GENERATOR_USER}" ]; then
  adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --no-create-home \
    --uid "${OPENAPI_GENERATOR_UID}" \
    "${OPENAPI_GENERATOR_USER}"
  chown -R 1000:1000 out/
fi
