#!/bin/bash

# Exit on fail
set -e

# Start services
npx next start -p 4200 id-client

# Finally call command issued to the docker service
exec "$@"
