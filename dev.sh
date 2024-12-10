#!/bin/bash

GRAY='\033[90m'
RESET='\033[0m'
BOLD='\033[1m'
BOLD_GREEN='\033[1;32m'

print_centered_message() {
  local message="$1"
  local term_width=$(tput cols)    # Get the terminal width
  local msg_length=${#message}
  local padding_char="-"
  local padding_length=$(( (term_width - msg_length - 2) / 2 ))  # Calculate padding length

  # Create the padding string
  local padding=$(printf "%${padding_length}s" | tr ' ' "${padding_char}")

  # Print the centered message with padding
  echo "${BOLD_GREEN}${padding} ${message} ${padding}${RESET}"
}



(print_centered_message "Building shared package" && cd shared && npx tsc) && \
(print_centered_message "Updating types in server" && cd server && yarn add "../shared/" && echo "${RESET}" ) && \
(print_centered_message "Updating types in client" && cd client && yarn add "../shared/") && \

print_centered_message "Starting dev servers"

(cd server && yarn dev) & (cd client && yarn start) && wait