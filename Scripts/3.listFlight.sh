#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo ------------------------------
echo
echo "Calling findAll Flights function"
echo

near view $CONTRACT getAll '{"offset":0}' --accountId $OWNER

echo
echo
echo ------------------------------
echo
echo "Calling getFlightCount function"
echo

near view $CONTRACT getFlightCount '{}' --accountId $OWNER

echo
echo
echo -------------------------------
echo
echo "Calling findByFlights function"
echo
read -p "Enter Flight id: " id
echo
echo

near call $CONTRACT getById '{"id": '$id'}' --accountId $OWNER