const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    reservations( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): ReservationConnection!
    reservation(id: ID!): Reservation
    # Queries for the current user
    me: User
    getAllUsers: [User]
    getAllReservations: [Reservation]
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type ReservationConnection { # add this below the Query type as an additional type.
    reservations: [Reservation]!
  }

  type Reservation {
    id: ID!
    fromDate: String!
    toDate: String!
    comment: String
    transportType: String
    payedInAdvanced: Boolean
    rentOveralls: Boolean
  }

  type User {
    id: ID!
    email: String!
    name: String
    phoneNumber: Int
  }

  type Mutation {
    # if false, booking trips failed -- check errors
    makeReservations(reservationIds: [ID]!): ReservationUpdateResponse!

    createUser(
      name: [String]
      phoneNumber: [Int]
      email: [String]
    ): UserUpdateResponse!

    makeReservation(
      userId: Int
      fromDate: String
      toDate: String
      comment: String
      transportType: String
      payedInAdvanced: Boolean
      rentOveralls: Boolean
    ): [ReservationUpdateResponse]
  }

  type ReservationUpdateResponse {
    success: Boolean!
    message: String
    reservations: [Reservation]
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
    user: [User]
  }
`;

module.exports = typeDefs;
