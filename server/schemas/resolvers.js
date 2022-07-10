const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Character } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("I am Groot. Translation: Not logged in!");
    },

    characters: async () => {
      return Character.find();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "You shall not pass! Invalid credentials"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "You shall not pass! Invalid credentials"
        );
      }

      const token = signToken(user);
      return { token, user };
    },

    saveCharacter: async (parent, character, context) => {
      if (context.user) {
        console.log(character);
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedCharacters: character } },
          { new: true, runValidators: true }
        );
        console.log(updateUser);
        return updateUser;
      }
      throw new AuthenticationError("Puny God, you need to be logged in.");
    },

    // removeCharacter: async (parent, )
  },
};

module.exports = resolvers;
