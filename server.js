import express from "express";
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('Hi.');
});

app.listen(port, function () {
    console.log(`Tic Tac Toe up and running at port ${port}`);
});