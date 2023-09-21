#!/bin/sh

podman run \
  -it \
  --init \
  --rm \
  --user node \
  -p "3000:3000" \
  --name holiday-planner \
  holiday-planner-node
