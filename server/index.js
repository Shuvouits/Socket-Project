import dotenv from "dotenv"
import app from "./app.js";
import logger from "./configs/logger.js";

//dotenv config
dotenv.config();

const PORT = process.env.PORT || 8000;

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