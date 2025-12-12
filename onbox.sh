#!/usr/bin/env bash
set -euo pipefail

yarn install

NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production yarn build