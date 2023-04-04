#!/bin/bash

# docker compose build --no-cache
docker compose build
docker compose up -d

docker exec medusa-server-default medusa seed -f ./data/seed.json
