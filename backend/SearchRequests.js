const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const helmet = require('helmet');
const axios = require('axios');
var cors = require('cors')


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/search/:query', (req, res) => {
    const param = req.params.query;

    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs', {
          params: { "query": param, "size": 12 },
          headers: { "Authorization": "65264e01d6eee3f64813d1a9c6194802" }
    })
    .then((response) => {
        console.log("logging in /search/:query");
        console.log(response.data);
        res.json(response.data);
    })
    .catch(function(error){
        console.log("error");
    });
});

app.get('/songs/:id', (req, res) => {
    const param = req.params.id;

    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs/' + param, {headers: { "Authorization": "65264e01d6eee3f64813d1a9c6194802"}})
    .then((response) => {
        console.log("logging in /songs/:id");
        console.log(response);
        res.json(response.data);
    })
    .catch(function(error){
        console.log("error");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))