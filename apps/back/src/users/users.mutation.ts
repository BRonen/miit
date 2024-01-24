import { GraphQLFieldConfig, GraphQLString } from "graphql";

export const usersMutation: GraphQLFieldConfig<unknown, unknown> = {
    type: GraphQLString,
    description: 'Sample query which returns string!',
    args: {
        awa: { type: GraphQLString }
    },
    resolve: (_, { awa }: { awa: string }) => {
        console.log({awa})
        return 'Hello from createUser';
    }
};