#!/bin/bash
set -e

# Validation that the token is available
if [ -z "$JUDGE0_AUTH_TOKEN" ]; then
  echo "JUDGE0_AUTH_TOKEN is not set, please set it."
  echo "You can do this by running:"
  echo -e "\033[1mexport JUDGE0_AUTH_TOKEN='<your_token>'\033[0m"
  exit 1
fi

# Usage example
if [ -z "$1" ] && [ -z "$2" ]; then
  echo -e "Usage: \033[1m$0 <challenge_dir> <extension>\033[0m"
  echo -e "Example: \033[1m$0 challenge-sorting-strings py\033[0m"
  exit 1
fi

# Validate challenge directory
if [ ! -d "$1" ]
then
  echo -e "\033[31m\033[1m$1 is not directory.\033[0m"
  echo "Please write only the challenge root directory."
  exit 1
fi

# Validate file extension
if [ -z "$2" ]
then
  echo "Pass the extension as the second argument."
  echo -e "Supported extensions are \033[1m'py'\033[0m and \033[1m'js'\033[0m"
  exit 1
fi

if [ "$2" != "py" ] && [ "$2" != "js" ]
then
  echo -e "Unsupported extension: \033[31m\033[1m$2\033[0m"
  echo -e "Supported extensions are \033[1m'py'\033[0m and \033[1m'js'\033[0m"
  exit 1
fi


# Configuration of the host
JUDGE0_HOSTNAME="judge.hackademy.mx"
JUDGE0_HOST="https://${JUDGE0_HOSTNAME}"

echo -e "Creating the zip from: \033[1m$@\033[0m"

# Add new line to all the files
echo "" >> "$1/index.$2"
echo "" >> "$1/testframework.$2"
echo "" >> "$1/test.$2"

# Create a temp file with all the content concatenated
cat "$1/index.$2" "$1/testframework.$2" "$1/test.$2" > upload.judge0
echo -e "Created the upload temporary file"

# Create the zip file with the quiet flag, and the - indicates that the zip will be
# piped as stdout to the next command and the -j that the file will be only the name
# without the path
additional_files=$(zip -q -j - upload.judge0 "$1/run" | base64)

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

rm upload.judge0
echo -e "Removed temporary file"

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
