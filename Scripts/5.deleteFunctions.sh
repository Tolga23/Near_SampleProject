#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo ------------DELETE-----------------------
echo

read -p "Enter Flight id: " id
echo
echo

near call $CONTRACT deleteById '{"id": '$id'}' --accountId $OWNER

echo
echo
echo -------------DELETE ALL-------------------

echo "Calling deleteAll function"
echo
echo 

near call $CONTRACT deleteAllFlights '{}' --accountId $OWNER

echo
echo
echo