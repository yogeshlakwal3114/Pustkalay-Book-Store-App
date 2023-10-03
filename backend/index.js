import express, { request, response } from "express";
import {PORT, MongoDbURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./modals/bookModal.js";
import bookRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'https://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowed: ['Content-Type'],
//     })
// )

app.get('/', (request,response)=>{
     console.log(request);
     return response.status(234).send('Welcome to MERN Stack Book Store App');
})

app.use('/books', bookRoute);

mongoose
     .connect(MongoDbURL)
     .then(() =>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is Running to Port : ${PORT}`);
        });
     })
     .catch((error) => {
        console.log(error);
     })