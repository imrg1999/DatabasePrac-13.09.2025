import express from 'express';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.status(200).json({
        message: "Welcome to the Homepage"
    });
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})