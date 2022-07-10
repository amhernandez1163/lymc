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
          "Invalid credentials! I can do this all day."
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Invalid credentials! I can do this all day."
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
          { $addToSet: { savedCharacters: newCharacter } },
          { new: true }
        );
        console.log(updateUser);
        return updateUser;
      }
      throw new AuthenticationError("Puny God, you need to be logged in.");
    },

    removeCharacter: async (parent, { characterId }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCharacters: { characterId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Puny God, you need to be logged in.");
    },
  },
};

module.exports = resolvers;
