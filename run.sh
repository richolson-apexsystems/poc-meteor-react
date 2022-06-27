#!/bin/bash
# --allow-incompatible-update
export HTTP_FORWARDED_COUNT=1;
export NODE_OPTIONS='--tls-min-v1.0';
export ROOT_URL="https://react.zenzig.com";
until meteor --port 3003 --settings ./settings.json; do
    echo "Server 'meteor' crashed with exit code $?.  Respawning.." >&2
    sleep 1
done
