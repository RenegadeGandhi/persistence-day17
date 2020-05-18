const express = require("express");
const app = express();
const fs = require("fs");

const port = process.env.PORT || 5000;


app.get('/add/:id', (req, res, next) => {
    let word = req.params.id;
    fs.appendFile('myWords.txt', word, function (err) {
        if (err) throw err;
        res.status(200).send("Word Added!");
    });
});

app.get("/list", (req, res, next) => {
    //array containing contents of myWords.txt is sent as string response
    fs.readFile('myWords.txt', 'utf8', function(err, content) {
        if (err) throw err;
        res.status(200).send(content);
    });
});

app.get("/delete", (req, res, next) => {
    //delete contents of myWords.txt
    fs.truncate('../persistence-day17/myWords.txt', 0, function() { 
        res.status(200).send("Content Deleted"); 
    });
});

app.use((req, res, next) => {
    res.status(302).send(`Head over to /add`);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})