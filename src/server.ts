import { app } from "./app";
import { pgClientSetup } from "./clients";

const pgClient = pgClientSetup();
pgClient.connect()
  .then(async () => {
    console.log("Postgres connected");
    const { app } = await import("./app");
    app.listen(3000, () => console.log("App is running at port http://localhost:3000"));
  })
  .catch((err) => {
    console.log("POSTGRES CONNECTION ERROR:");
    console.error(err);
  });

export { pgClient }
