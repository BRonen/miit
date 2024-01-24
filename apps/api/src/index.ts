import { createApp, loadGraphQLRoute, loadHealthCheckRoute } from "./app";
import { loadDatabase } from "./database";

(async () => {
  const app = createApp();
  
  loadHealthCheckRoute(app);
  loadGraphQLRoute(app);
  
  // await loadDatabase();

  app.listen(
    9000,
    () => console.log("listening at http://0.0.0.0:9000/"),
  );
})();