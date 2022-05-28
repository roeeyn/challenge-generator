#!/bin/bash

# Validation that the token is available
if [ -z "$JUDGE0_AUTH_TOKEN" ]; then
  echo "JUDGE0_AUTH_TOKEN is not set, please set it."
  echo "You can do this by running:"
  echo "export JUDGE0_AUTH_TOKEN='<your_token>'"
  exit 1
fi

# Configuration of the host
JUDGE0_HOSTNAME="judge.hackademy.mx"
JUDGE0_HOST="https://${JUDGE0_HOSTNAME}"

# Create the zip file with the quiet flag, and the - indicates that the zip will be
# piped as stdout to the next command
echo "Creating the zip file with: index.js test.js run"
additional_files=$(zip -q - index.js test.js run | base64)

echo "Creating the submission"
# Create the submission with the additional files, and pipe the result through jq to
# get the submission token
token=$(curl -s -X POST -H "Content-Type: application/json" -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" -d "{\"language_id\": 89, \"additional_files\": \"$additional_files\"}" "$JUDGE0_HOST/submissions?wait=false" | jq -r ".token")

echo "Created submission with token: $token"

# Loop until the submission is finished
while true; do
  sleep 1

  # Get the submission status from the Judge0 API
  echo "Checking submission status..."
  submission=$(curl -s -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" "$JUDGE0_HOST/submissions/$token" | jq)

  # Parse the status and show the status description
  statusId=$(echo $submission | jq -r ".status.id")
  statusDescription=$(echo $submission | jq -r ".status.description")

  # If the status is 'In Queue' or 'Processing', keep looping
  if [ $statusId = 1 ] || [ $statusId = 2 ]; then
    echo "Current submission status: $statusDescription"
    continue
  # Otherwise we can continue with the results of the submission
  else
    echo "Done!"
    break
  fi
done

curl -s -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" "$JUDGE0_HOST/submissions/$token" | jq
