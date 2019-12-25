module.exports = {
  Query: {
    reservation: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getReservationById({ id })),
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
};
