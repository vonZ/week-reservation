module.exports = {
  Query: {
    reservation: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getReservationById({ id })),
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
    getAllUsers: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getAllUsers()),
    getAllReservations: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllReservations())
  },
  Mutation: {
    createUser: async (_, { name, phoneNumber, email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({
        name,
        phoneNumber,
        email
      });
      if (user) return new Buffer(email).toString("base64");
    },
    makeReservation: async (_, reservation, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateReservation(
        reservation
      );
    }
  }
  //   Mutation: {
  //     makeReservation: async (_, { launchIds }, { dataSources }) => {
  //       const results = await dataSources.userAPI.bookTrips({ launchIds });
  //       const launches = await dataSources.launchAPI.getLaunchesByIds({
  //         launchIds
  //       });

  //       return {
  //         success: results && results.length === launchIds.length,
  //         message:
  //           results.length === launchIds.length
  //             ? "trips booked successfully"
  //             : `the following launches couldn't be booked: ${launchIds.filter(
  //                 id => !results.includes(id)
  //               )}`,
  //         launches
  //       };
  //     },
  //     cancelTrip: async (_, { launchId }, { dataSources }) => {
  //       const result = dataSources.userAPI.cancelTrip({ launchId });

  //       if (!result)
  //         return {
  //           success: false,
  //           message: "failed to cancel trip"
  //         };

  //       const launch = await dataSources.launchAPI.getLaunchById({ launchId });
  //       return {
  //         success: true,
  //         message: "trip cancelled",
  //         launches: [launch]
  //       };
  //     },
  //     login: async (_, { email }, { dataSources }) => {
  //       const user = await dataSources.userAPI.findOrCreateUser({ email });
  //       if (user) return new Buffer(email).toString("base64");
  //     }
  //   },
  // User: {
  //   reservations: async (_, __, { dataSources }) => {
  //     // get ids of reservations by user
  //     const reservationIds = await dataSources.userAPI.getReservationIdsByUser();

  //     if (!reservationIds.length) return [];

  //     // look up those reservations by their ids
  //     return (
  //       dataSources.reservationAPI.getReservationsByIds({
  //         reservationIds
  //       }) || []
  //     );
  //   }
  // }
};
