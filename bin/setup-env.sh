#!/bin/sh

# Remove any old image, if it's existing
podman rmi holiday-planner-node

# This will read the Dockerfile and will create an image
podman build -t holiday-planner-node .
