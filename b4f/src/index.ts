import express from "express";
import cors from "cors";
import nocache from "nocache";
import compression from "compression";
import {
  CorsHost,
  ServerPort,
  DbName,
  DbPort,
  Host,
  RepositoryType,
} from "./config";
import { apiRouter } from "./api/api";
import { dbFactory } from "./db";
import { Logger, loggerInit } from "./logger";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";

loggerInit();

const app = express();
app.use(compression());

if (CorsHost) {
  app.use(cors());
  app.options(CorsHost, cors());
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(nocache());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRouter);

const server = app.listen(ServerPort, () =>
  Logger.writeEvent("B4f is listening on port " + ServerPort)
);

server.on("error", Logger.writeException);

try {
  if (!Host || !DbName || !DbPort) {
    Logger.writeException(
      new Error("Db connection not valid..."),
      "index.ts/Env_Const_Check"
    );
    server.close(() => {
      Logger.writeEvent("Backend shutdown.");
      return process.exit(0);
    });
  }
  const db = dbFactory(RepositoryType);
  db.initDb()
    .then((res) => {
      if (typeof res === "string") {
        Logger.writeEvent(res);
      } else {
        Logger.writeEvent("InitDB success.");
        Logger.writeTrace(`Typing error: ${res}`, 1);
      }
    })
    .catch((e) => {
      Logger.writeException(new Error(e), "001-DB", "index.ts/db.initDb()");
    });
} catch (e) {
  Logger.writeException(e as Error, "002-DB", "index.ts/db.initDb");
}
