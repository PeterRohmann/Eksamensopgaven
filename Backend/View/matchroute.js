const fs = require('fs');
const express = require('express');
const routermatch = express.Router()

const matchPath = '../Model/matches.json';



//Håndter like function
routermatch.post('/match/match', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const MatchId = parsedData.length;
    req.body.matchId = MatchId;
    parsedData.push(req.body)
    fs.writeFile(matchPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
      
});

routermatch.get('/match/showmatches', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    res.send(parsedData)
   
    },true);
      
});

module.exports = routermatch;