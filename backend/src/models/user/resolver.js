const { TokenManagement } = require("../../helpers/authen/jwt");
const { UserManament, UserManagement } = require("./data");
const root = {
  Account: {
    token: async (user, _, __, ___) => {
      const encoder = new TokenManagement();
      return encoder.signToken(user);
    },
  },
};
const Query = {
  logIn: async (_, { input }, __, ___) => {
    const service = new UserManagement();
    return await service.logInUser(input);
  },
};
const Mutation = {
  signUp: async (_, { input }, __, ___) => {
    const service = new UserManagement();
    return await service.signUpUser(input);
  },
};

module.exports = { root, Query, Mutation };
