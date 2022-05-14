import config from "../config/config";
import mongoose from "mongoose";
import log from "../logger/index";

async function connect(){
    try {
      await mongoose.connect(config.dbUrl);
      log.info("DATABASE CONNECTED");
    } catch( e ) {
     log.info(e);
    }
}

export default connect;