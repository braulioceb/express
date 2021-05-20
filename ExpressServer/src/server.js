const express = require('express');
const app = express();
const PORT = 5000;

const routes = require('./routes/router')

app.use(express.json());

app.use(routes);
app.use((req, res) => {
    res.status(404).send({
        message: 'Resourse not Found',
    })
})


app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
})