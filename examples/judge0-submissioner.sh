#!/bin/bash
set -e

# Validation that the token is available
if [ -z "$JUDGE0_AUTH_TOKEN" ]; then
  echo "JUDGE0_AUTH_TOKEN is not set, please set it."
  echo "You can do this by running:"
  echo -e "\033[1mexport JUDGE0_AUTH_TOKEN='<your_token>'\033[0m"
  exit 1
fi

# Validate files are passed as arguments
if [ "$#" -lt 1 ]; then
  echo "Please write at least one file argument"
  echo -e "example: \033[1mjude0-submissioner file1 file2 file3\033[0m"
  exit 1
fi

# Validate files are not links nor directories
for file in "$@"
do
  if [ -h  "$file" ]
  then
    echo -e "\033[31m\033[1m$file is a symbolic link.\033[0m"
    echo "Please write only valid files."
    exit 1
  fi
  if [ -d "$file" ]
  then
    echo -e "\033[31m\033[1m$file is a directory.\033[0m"
    echo "Please write only valid files."
    exit 1
  fi
done

# Configuration of the host
JUDGE0_HOSTNAME="judge.hackademy.mx"
JUDGE0_HOST="https://${JUDGE0_HOSTNAME}"

# Create the zip file with the quiet flag, and the - indicates that the zip will be
# piped as stdout to the next command and the -j that the file will be only the name
# without the path
echo -e "Creating the zip file with: \033[1m$@\033[0m"
additional_files=$(zip -q -j - $@ | base64)

echo "Creating the submission"
# Create the submission with the additional files, and pipe the result through jq to
# get the submission token
token=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" \
  -d "{\"language_id\": 89, \"additional_files\": \"$additional_files\"}" \
  "$JUDGE0_HOST/submissions?wait=false" \
  | jq -r ".token")

echo -e "Created submission with token: \033[1m$token\033[0m"

# Loop until the submission is finished
while true; do
  sleep 1

  # Get the submission status from the Judge0 API
  echo "Checking submission status..."
  submission=$(curl -s \
    -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" \
    "$JUDGE0_HOST/submissions/$token" \
    | jq)

  # Parse the status and show the status description
  statusId=$(echo $submission | jq -r ".status.id")
  statusDescription=$(echo $submission | jq -r ".status.description")

  # If the status is 'In Queue' or 'Processing', keep looping
  if [ $statusId = 1 ] || [ $statusId = 2 ]; then
    echo -e "Current submission status: \033[1m\033[35m$statusDescription\033[0m"
    continue
  # Otherwise we can continue with the results of the submission
  else
    echo -e "\033[1m\033[32mDone!\033[0m"
    break
  fi
done

curl -s -H "X-Auth-Token: ${JUDGE0_AUTH_TOKEN}" "$JUDGE0_HOST/submissions/$token" | jq
