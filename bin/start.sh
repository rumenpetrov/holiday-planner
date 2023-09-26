#!/bin/sh

podman run \
  -it \
  --rm \
  --net=host \
  --privileged \
  --name holiday-planner-node \
  -v "$(pwd)"/:/var/www/app:Z \
  -p 3000:3000 \
  holiday-planner-node:latest

