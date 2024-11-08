import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";


//create express app
const app = express();

//morgan --help http logger information
app.use(morgan('dev'))

//Helmet --help http header security
app.use(helmet);

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

app.get('/', (req,res)=> {
    res.send("hello from server")
})


export default app;