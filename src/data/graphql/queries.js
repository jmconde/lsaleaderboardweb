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
    },
    flightsByPilot: monthlyFlightsByPilot(start:$start, end:$end) {
      x
      y
    }
    flightsByDay: monthlyFlightsByDay(start:$start, end:$end) {
      x
      y
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
    flightsByPilot: monthlyFlightsByPilot(start:$start, end:$end) {
      x
      y
    }
  }`,

  GQL_FLIGHTS_BY_DAY:  gql`query getFlightsByDay ($start: String!, $end: String!) {
    flightsByDay: monthlyFlightsByDay(start:$start, end:$end) {
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
      location
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
      location
      flights
      flightTime
      country
      lastFlight{
        pilotId
        departure
        arrival
        time
        distance
        date
        landingRate
        state
        status
      }
    }
  }`,
};