import app from './server.js'
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import ReviewsDAO from "./dao/reviewsDAO.js";


const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URI;

MongoClient.connect(    
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        // useNewUrlParser: true,
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})
