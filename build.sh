#!/bin/bash
set -euxo pipefail

echo "Starting build process..."

cp userdata.sh terraform/userdata.sh
