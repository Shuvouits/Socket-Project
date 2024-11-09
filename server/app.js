import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import winston from "winston";  //it helps to shows various log information
import routes from './routes/index.js'

// Destructure the `error` function from winston if needed
const { error } = winston;


//create express app
const app = express();

//morgan --help http logger information
app.use(morgan('dev'))

//Helmet --help http header security
app.use(helmet());

//Parse json request body
app.use(express.json());

//Parse Json request from the body
app.use(express.urlencoded({extended: true}))

//sanitize prevent mongodb injection
app.use(mongoSanitize());

//create cookie header
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(fileUpload({
    useTempFiles: true,
}));

//use cors prevent form cross origin attack

app.use(cors({
    origin: "http://localhost:3000",
}));

//api v1 routes
app.use("/api/v1", routes);



app.use(async(req, res, next)=> {
    next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async(err, req, res, next)=> {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
});


export default app;