// assembly/model.ts
import { ContractPromiseBatch, u128, context, logging, PersistentUnorderedMap, math, storage } from 'near-sdk-core';

export const flights = new PersistentUnorderedMap<u32, Flight>('flights');

import { AccountId, toYocto } from "./utils";

@nearBindgen
export class Customer {
    enoughDeposit: bool;
    deposit: u128;
    accountId: AccountId;
    sender: string;
    constructor(deposit: u128) {
        this.enoughDeposit = context.attachedDeposit >= u128.from(deposit);
        this.sender = context.sender;
    }

    static buyTicket(accountId: AccountId, id: u32): void {
        let flight = Flight.findById(id);
        const customer = new Customer(u128.fromU32(flight.price));

        if (flight.availableSeats <= 0) {
            flight.availableSeats = 0;
            assert(flight.availableSeats, "Flight already booked");
        }

        let ticketPrice = toYocto(flight.price);
        let customerDeposit = context.attachedDeposit;


        if (customer.enoughDeposit == false && customerDeposit < ticketPrice) {
            assert(customer.enoughDeposit, "You do not have sufficient funds");
        }

        const to_beneficiary = ContractPromiseBatch.create(accountId);
        const amount_to_receive = customerDeposit;
        to_beneficiary.transfer(amount_to_receive);
        flight.bookedBy = accountId;
        flight.availableSeats -= 1;
        logging.log(`${customer.sender} bought a ticket for ${flight.price} on flight ${flight.id} from ${flight.origin} to ${flight.destination} on ${flight.date}`);

        flights.set(id, flight);

    }


}

@nearBindgen
export class Flight {
    public id: u32;
    public origin: string;
    public destination: string;
    public price: u32;
    public date: string;
    public availableSeats: u32;
    public bookedBy: string;


    constructor(origin: string, destination: string, price: u32, date: string, availableSeats: u32) {
        this.id = math.hash32<string>(origin + date + destination);
        this.origin = origin;
        this.destination = destination;
        this.price = price;
        this.date = date;
        this.availableSeats = availableSeats;
        this.bookedBy = "";

    }

    static create(origin: string, destination: string, price: u32, date: string, availableSeats: u32): Flight {
        const flight = new Flight(origin, destination, price, date, availableSeats);

        flights.set(flight.id, flight);
        return flight;
    }

    static deleteById(id: u32): void {
        flights.delete(id);
    }

    static findByOrigin(origin: string): Flight {
        return flights.getSome(math.hash32<string>(origin));
    }

    //findByAll
    static findById(id: u32): Flight {
        return flights.getSome(id);
    }

    //findAll
    static findAll(offset: u32, limit: u32): Flight[] {
        return flights.values(offset, offset + limit);
    }
    // count flights
    static count(): u32 {
        return flights.length;
    }

    static update(id: u32, origin: string, destination: string, price: u32, date: string): Flight {
        const flight = Flight.findById(id);

        if (flight.availableSeats <= 0) {
            assert(false, "Flight already booked");
        }

        flight.origin = origin;
        flight.destination = destination;
        flight.price = price;
        flight.date = date;
        let customer = flight.bookedBy != context.sender ? flight.bookedBy : "";
        flight.bookedBy = customer;
        flights.set(id, flight);
        return flight;
    }


    static deleteAllFlights(): void {
        flights.clear();
    }


}




