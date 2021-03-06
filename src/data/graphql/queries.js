import {gql } from 'graphql-request'

export const GraphQLQueries = {
  GQL_ALL_METRICS:  gql`query getAllMetrics($start: String!, $end: String!) {
    allMetrics:getMetrics(start:$start, end:$end) {
      metric
      id
    } 
    ivaoMetrics:getIvaoMetrics(start:$start, end:$end) {
      all {
        metric
        id
      }
      byPilot {
        id
        name
        metrics {
          id
          metric
        }
      }
      byDay {
        id
        name
        metrics {
          id
          metric
        }
      }
    },
    flightsByPilot:getFlightsByPilot(start:$start, end:$end) {
      x
      y
    }
    flightsByDay:getFlightsByDay(start:$start, end:$end) {
      x
      y
    }
    timeByPilot:getTimeByPilot(start:$start, end:$end) {
      x
      y
    }
    timeByDay:getTimeByDay(start:$start, end:$end) {
      x
      y
    }
    outsideVA: getIvaoNotInAirlineMetrics(start:$start, end:$end){
      all {
        metric
        id
      }
    }
  }`,

  GQL_IVAO_METRICS: gql`query getIvaoMetrics($start: String!, $end: String!) {
    ivaoMetrics:getIvaoMetrics(start:$start, end:$end) {
      all {
        metric
        id
      }
      byPilot {
        id
        name
        metrics {
          id
          metric
        }
      }
    }
  }`,

  GQL_FLIGHTS_BY_PILOT:  gql`query getFlightsByPilot ($start: String!, $end: String!) {
    flightsByPilot: getFlightsByPilot(start:$start, end:$end) {
      x
      y
    }
  }`,

  GQL_FLIGHTS_BY_DAY:  gql`query getFlightsByDay ($start: String!, $end: String!) {
    flightsByDay: getFlightsByDay(start:$start, end:$end) {
      x
      y
    }
  }`,
  GQL_TIME_BY_PILOT:  gql`query getTimeByPilot ($start: String!, $end: String!) {
    timeByPilot:getTimeByPilot(start:$start, end:$end) {
      x
      y
    }
  }`,

  GQL_TIME_BY_DAY:  gql`query getTimeByDay ($start: String!, $end: String!) {
    
    timeByDay:getTimeByDay(start:$start, end:$end) {
      x
      y
    }
  }`,

  GQL_LIST_AIRCRAFTS: gql`query getAircrafts {
    aircrafts:getAircraftList {
      id
      type
      name
      registration
      state
      status
      location {
        id
      }
      fleet
      hub
      flightTime
      fuelOnboard
    }
  }`,

  GQL_LIST_PILOTS: gql`query getActivePilotList {
    pilots:getActivePilotList {
      id
      pilotId
      name
      rankId
      rankName
      location {
        id
        lat
        lon
        name
        location
        country
      }
      flights
      flightTime
      country
      lastFlight{
        pilot {
          id
        }
        departure {
          id
          lat
          lon
          name
          location
          country
        }
        arrival {
          id
          lat
          lon
          name
          location
          country
        }
        time
        distance
        landingRate
        state
        status
      }
    }
  }`,

  GQL_IVAO_FLIGHTS_OUTSIDE_VA: gql`query test($start:String!, $end:String!){
    getIvaoNotInAirlineMetrics(start:$start, end:$end){
      all {
        metric
        id
      }
      byPilot {
        id
        name
        metrics {
          id
          metric
        }
      }
      byDay {
        id
        name
        metrics {
          id
          metric
        }
      }
    }
  }`,

  GQL_LIVEMAP_DATA: gql`query getLiveMapData {
    airports:getAirportList {
      id
      lat
      lon
      name
      country
      location
      elevation
      frequencies{
        type
        description
        frequency_mhz
      }
      navaids {
        ident
        name
        type
        lat
        lon
        frequency_khz

      }
    }
  }`,

  

  GQL_LIVEMAP_DATA_LIGHT: gql`query getLiveMapDataLight {
    pilots:getActivePilotList {
      id
      pilotId
      name
      rankId
      rankName
      location {
        id
        lat
        lon
        name
        location
        country
      }
      flights
      flightTime
      country
    }
    aircrafts:getAircraftList {
      id
      type
      registration
      location {
        id
      }
      status
      state
      fleet
    }
  }`,

  GQL_FLIGHT_LOG: gql`query getLogFlights($start: String!, $end: String!) {
    log:getLogFlights(start:$start, end:$end ) {
      blockOffTime
      blockOnTime
      pilot {
        id
        pilotId
        name
      }
      departure {
        id
      }
      arrival {
        id
      }
      alternate {
        id
      }
      state
      status
      aircraft {
        fleet
        type
        registration
      }
      time
    }
  }`
};