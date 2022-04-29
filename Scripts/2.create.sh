#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Flight origin: " origin
echo
echo

read -p "Flight destination: " destination
echo
echo

read -p "Flight price (in cents): " price
echo
echo

read -p "Flight date: " date
echo
echo

read -p "Available seats: " availableSeats
echo
echo

near call $CONTRACT create '{"origin": "'"$origin"'", "destination": "'"$destination"'", "price": '$price', "date": "'"$date"'", "availableSeats": '$availableSeats'}' --accountId $OWNER 
