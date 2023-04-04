#!/bin/bash

# Delete Data
rm -rf backend/db_data
rm -rf backend/meili_data

# NOTE: IF you reset Minio you will need to remake the buckets
# rm -rf backend/minio_data