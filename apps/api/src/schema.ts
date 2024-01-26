import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createUserMutation, usersPaginatedQuery } from "./users"

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: () => ({ usersPaginatedQuery }),
});

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation',
  fields: () => ({ createUserMutation }),
});

export const schema = new GraphQLSchema({ query, mutation });