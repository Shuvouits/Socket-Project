import dotenv from "dotenv"
import app from "./app.js";
import logger from "./configs/logger.js";
import mongoose from "mongoose";

//dotenv config
dotenv.config();

//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mongodb error
mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : $(err)`);
    process.exit(1);
});

//connect mongodb
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    logger.info("Connected to Mongodb.");
})

let server;

server = app.listen(PORT, () => {
    logger.info(`server is listening at ${PORT}`);
    console.log("process id", process.pid);
});

//handle server error

const exitHandler = () => {
    if (server){
        logger.info("server closed");
    }else{
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error)=> {
    logger.error(error);
    process.exit(1);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);



//SigalTerm comes form signal Termination

process.on("SIGTERM", ()=> {
    if(server){
        logger.info('Server Closed');
        process.exit(1);
    }
})