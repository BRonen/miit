import { GraphQLString } from "graphql";

export const usersQuery = {
    type: GraphQLString,
    description: 'Sample query which returns string!',
    resolve: () => {
        return 'Hello from GraphiQL';
    }
};