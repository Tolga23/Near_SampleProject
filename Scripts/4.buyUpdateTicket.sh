#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


echo
echo ------------------------------
echo
echo "Calling buyTicket function"
echo


echo
echo "Account id: $OWNER"
echo

read -p "Flight id: " id
echo
echo


read -p "Price: " amount
echo

near call $CONTRACT buyTicket '{"accountId": "'"$OWNER"'", "id": '$id' }' --accountId $OWNER --amount $amount 

echo
echo -------------UPDATE-------------------
echo
read -p "Flight id: " id
echo


read -p "Flight origin: " origin
echo
echo

read -p "Flight destination: " destination
echo   
echo

read -p "Flight price: " price
echo
echo

read -p "Flight date: " date
echo
echo

near call $CONTRACT update '{"id": '$id', "origin": "'"$origin"'", "destination": "'"$destination"'", "price": '$price', "date": "'"$date"'" }' --accountId $OWNER

echo 
echo