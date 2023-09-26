#!/bin/sh

# Remove any old image, if it's existing
podman rmi holiday-planner-node:latest

# This will read the Dockerfile and will create an image
podman build -f ./Containerfile -t holiday-planner-node:latest
