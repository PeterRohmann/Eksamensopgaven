const express = require('express');
const fs = require('fs');
const router = express.Router()

const matchJSON = '../Database/matches.json';
const dataJSON = '../Database/users.json';
const likeJSON = '../Database/likes.json';


// til createProfileValidation
router.post('/', (req, res) => {
    
    fs.readFile(dataJSON, "utf8", (err, data) => {
    let axiosData = JSON.parse(data)
    const UserId = axiosData.length;
    //req. body = brugerinput
    req.body.id = UserId 
    axiosData.push(req.body)
    console.log(axiosData)
    fs.writeFile(dataJSON, JSON.stringify(axiosData),(e) => {
        res.status(200).send(axiosData);
    });
    })
      
});

// til like()
router.post('/like', (req, res) => {
    fs.readFile(likeJSON, "utf8", (err, data) => {
    let axiosData = JSON.parse(data)
    const likeId = axiosData.length;
    req.body.likeId = likeId;
    axiosData.push(req.body)
    
    fs.writeFile(likeJSON, JSON.stringify(axiosData),(e) => {
        
        res.status(200).send(JSON.stringify(axiosData));
    });
    })      
});

//Post til matches.json (bruges i like())
router.post('/match/match', (req, res) => {
    fs.readFile(matchJSON, "utf8", (err, data) => {
    let axiosData = JSON.parse(data)
    const MatchId = axiosData.length;
    req.body.matchId = MatchId;
    axiosData.push(req.body)
    fs.writeFile(matchJSON, JSON.stringify(axiosData),(e) => {
        res.status(200).send(JSON.stringify(axiosData));
    });
    })
});

// til loginValidation
router.post('/login', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
        console.log(data)
        const axiosData = JSON.parse(data);
        console.log(axiosData)
        for (let i=0; i < axiosData.length; i++) {
            if (req.body.username === axiosData[i].username 
                && req.body.password === axiosData[i].password) {
                let signedIn = axiosData[i];
                res.status(200).json(signedIn);
                return
            }
        }
        console.log(req.body)
        res.status(400).send("fejl");   
    },
    true);
});    

//til logOut
router.post('/logout', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
                res.status(200).json("You have been logget out");
                return
            },
    true);
});    

  //login
router.post('/login', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
        console.log(data)
        const userArray = JSON.parse(data);
        console.log(userArray)
        for (let i=0; i < userArray.length; i++) {
            if (req.body.username === userArray[i].username 
                && req.body.password === userArray[i].password) {
                let signedIn = userArray[i];
                res.status(200).json(signedIn);
                return
            }
        }
        console.log(req.body)
        res.status(400).send("fejl");   
    },
    true);
});    

//Håndter like function
router.post('/match/match', (req, res) => {
    fs.readFile(matchJSON, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const MatchId = parsedData.length;
    req.body.matchId = MatchId;
    parsedData.push(req.body)
    fs.writeFile(matchJSON, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
});

// til seeOwnProfile, seeFullProfile og showNextProfile
router.get('/:id', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
        let axiosData = JSON.parse(data)
        const userId = req.params["id"];
        userByIdArray = axiosData[userId];
        res.send(axiosData[userId]);
    });
}); 

//til likes
router.get('/likes', (req, res) => {
    fs.readFile(likeJSON, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        res.send(parsedData);
    });
}); 

// displayMyMatches()
router.get('/match/show', (req, res) => {
    fs.readFile(matchJSON, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    res.json(parsedData)
    },true);
      
});

//Opdater
router.patch('/:id', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
        let axiosData = JSON.parse(data)
        const userId = req.params["id"];
        axiosData[userId] = req.body;
    },
    true);
});


// deleteProfile()
router.delete('/:id', (req, res) => {
    fs.readFile(dataJSON, "utf8", (err, data) => {
        let axiosData = JSON.parse(data)
        const userId = req.params["id"];
        delete axiosData[userId];
        axiosData = axiosData.filter(function(x) {return x !== null});
    },
    true);
});

// like() fjerner like hvis brugen allerede er liket
router.delete('/likes/:id', (req, res) => {
    fs.readFile(likeJSON, "utf8", (err, data) => {
        let axiosData = JSON.parse(data)
        const likeId = req.params["id"];
        delete axiosData[likeId];
        //her fjernes null fra likes.json
        axiosData = axiosData.filter(function(y) {return y !== null});
    },
    true);
    
});


//Delete match hvis de allerede er matchet
router.delete('/delete/match/:id', (req, res) => {
    fs.readFile(matchJSON, "utf8", (err, data) => {
        let axiosData = JSON.parse(data)
        const userId = req.params["id"];
        delete axiosData[userId];
        axiosData = axiosData.filter(function(y) {return y !== null});
    },
    true);
    
});

module.exports = router;
 


