import { GraphQLFieldConfig, GraphQLInt, GraphQLList } from "graphql";
import { userModel } from "../models/user.model";
import { UserType } from "./users.types";

export type usersPaginatedQueryArgs = {
    limit: number
    offset: number
}

export const usersPaginatedQuery: GraphQLFieldConfig<unknown, unknown, usersPaginatedQueryArgs> = {
    type: new GraphQLList(UserType),
    description: 'Read users list',
    args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
    },
    resolve: async (_, { limit, offset }) => {
        console.log({ limit, offset })
        const users = await userModel.find({}).limit(limit).skip(offset).exec();

        console.log({users});

        return users;
    }
};