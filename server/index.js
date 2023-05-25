import express from 'express';
import cors from 'cors';
import generateSQL from './generateSQL.js';

const app = express()

app.use(express.json())
app.use(cors(
    { origin: "*"}
));

const port = process.env.PORT || 3008

app.get('/', (req, res) => {
    res.send("Hey there, I'm from OUR API")
})

app.post('/generatesql', async (req, res)=>{
    const  { queryDescription } = req.body;
    // res.send(`value: ${queryDescription}`);
    try {
        const sqlQuery = await generateSQL(queryDescription);
        res.json({response: sqlQuery})
    }catch(error){
        console.error(error)
        res.status(500).send(("Internal Server Error!"))
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})