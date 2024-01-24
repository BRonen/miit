import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { usersMutation, usersQuery } from "./users"

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: () => ({ usersQuery }),
});

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: () => ({ usersMutation }),
});

export const schema = new GraphQLSchema({ query, mutation });