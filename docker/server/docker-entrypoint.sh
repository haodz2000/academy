#!/bin/bash

# Exit on fail
set -e

# Start services
node server/main.js

# Finally call command issued to the docker service
exec "$@"
