import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { userModel } from "../models/user.model";
import { UserType } from "./users.types";

export type createUserMutationArgs = {
    username: string
    password: string
};

export const createUserMutation: GraphQLFieldConfig<unknown, unknown, createUserMutationArgs> = {
    type: UserType,
    description: 'Create new user mutation',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (_, { username, password }) => {
        console.log({ username, password });

        const user = await userModel.create({ username, password });

        return user;
    }
};