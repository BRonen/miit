import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { getGraphQLParameters, processRequest, renderGraphiQL, shouldRenderGraphiQL, sendResult } from "graphql-helix";
import { schema } from "./schema";

export const loadHealthCheckRoute = (app: Koa) => {
    const router = new Router();

    router.all("/", async (ctx) => ( ctx.body = "healthy" ));

    return app
        .use(router.routes())
        .use(router.allowedMethods());
};

export const loadGraphQLRoute = (app: Koa) => {
    const router = new Router();

    router.all("/graphql", async (ctx) => {
        const request = {
            body: ctx.request.body,
            headers: ctx.req.headers,
            method: ctx.request.method,
            query: ctx.request.query,
        };

        if (shouldRenderGraphiQL(request)) {
            ctx.body = renderGraphiQL({});
            return;
        }

        const { operationName, query, variables } = getGraphQLParameters(request);

        const result = await processRequest({
            operationName,
            query,
            variables,
            request,
            schema,
        });

        ctx.respond = false;
        sendResult(result, ctx.res);
    });

    return app
        .use(router.routes())
        .use(router.allowedMethods());
};

export const createApp = () => {
    const app = new Koa();

    app.use(bodyParser());

    return app;
}