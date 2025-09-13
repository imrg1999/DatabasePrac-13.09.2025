import express from 'express';
import { connectDB } from './Config/dbConn';
import userRoute from './Route/userRoute.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',userRoute);

connectDB();

app.get('/',(req,res) => {
    res.status(200).json({
        message: "Welcome to the Homepage"
    });
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})