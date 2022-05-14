import express from "express";
import path from "path";
import config from "./config/config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";

const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb"}));
app.use((req,res,next) => {
    log.info(`URL ${req.url}  METHOD ${req.method}`);
    next();
});

app.listen(port, host, () =>{
    log.info(`APP RUNNING ON http://${host}:${port}`);
    connect();
});

routes(app);
app.use((req,res,next) => res.status(404).sendFile(path.join(__dirname,"views/404.html")));
