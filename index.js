import express from 'express';
import { connectDB } from './Config/dbConn';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.get('/',(req,res) => {
    res.status(200).json({
        message: "Welcome to the Homepage"
    });
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})