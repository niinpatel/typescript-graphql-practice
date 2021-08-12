import accessEnv from "#root/helpers/accessEnv";
import * as express from "express";
import * as cors from "cors";

const PORT = Number(accessEnv("PORT", "7000"));

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
