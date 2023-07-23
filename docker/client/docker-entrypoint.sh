#!/bin/bash

# Exit on fail
set -e

# Start services
npx next start -p 4200 client

# Finally call command issued to the docker service
exec "$@"
