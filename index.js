const express = require("express");
const app = express();
const port = 3333;
var dir = './all-data';
const cors = require("cors");
const fs = require('fs');

app.use(loggerHueHue);
app.use(cors());

app.get('/', (req, res)=>{
    try {
        res.send(fs.readFileSync('./index.html').toString());
    } catch(e) {
        res.json(e);
    }
});

app.get('/items', (req, res) => {
    try {
        getAllFiles(req, res);
    } catch(e) {
        res.json(e);
    }
});

app.get('/items/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log(filename);
    try {
        getSingleFile(req, res, filename);
    } catch(e) {
        res.json(e);
    }
});

function getSingleFile(req, res, filename) {
    let path = `${dir}/${filename}`;
    if (fs.existsSync(path)){
        res.download(path);
    } else {
        throw `Not Found`;
    }
}

function getAllFiles(req, res){
    let data = fs.readdirSync(dir);
    // console.log(data);
    res.json({files: data});
}

function loggerHueHue(req, res, next) {
    console.log(`URL: ${req.originalUrl}, METHOD: ${req.method}`);
    next();
}

app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`);
});