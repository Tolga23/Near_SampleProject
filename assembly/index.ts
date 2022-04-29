// contract/assembly/index.ts


import { Customer, Flight, flights } from "./models";



export function create(origin: string, destination: string, price: u32, date: string, availableSeats: i32): Flight {
  return Flight.create(origin, destination, price, date, availableSeats);
}


export function deleteById(id: i32): void {
  Flight.deleteById(id);
}

export function getFlightByOrigin(origin: string): Flight {
  return Flight.findByOrigin(origin);
}

// FindbyId
export function getById(id: i32): Flight {
  return Flight.findById(id);
}

// FindAll
export function getAll(offset: u32, limit: u32 = flights.length): Array<Flight> {
  return Flight.findAll(offset, limit);
}

export function getFlightCount(): i32 {
  // get the total number of flights
  return Flight.count();

}

export function update(id: i32, origin: string, destination: string, price: u32, date: string): Flight {
  return Flight.update(id, origin, destination, price, date);
}


//buyTicket by accountId and flightId 
export function buyTicket(accountId: string, id: i32): Flight {
  Customer.buyTicket(accountId, id);
  return Flight.findById(id);
}

export function deleteAllFlights(): void {
  Flight.deleteAllFlights();
}