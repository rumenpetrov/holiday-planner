#!/bin/sh

podman run \
  -it \
  --rm \
  --init \
  --name "holiday-planner-node" \
  -v "$(pwd)"/:/var/www/app:Z \
  -p 4321:4321 \
  holiday-planner-node:latest

